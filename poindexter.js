const { readdir, stat, readFile, outputFileSync } = require('fs-extra')
const { resolve, relative } = require('path')
const { configent } = require('configent')
const cheerio = require('cheerio')

/** @param {Partial<import('./defaults.js')>} options  */
async function poindexter(options = {}) {
    const config = configent(require('./defaults'), options, { useDetectDefaults: true })
    const {
        flexsearch,
        docs,
        output,
        scrape,
    } = config

    /** @ts-ignore */
    /** @type {import('flexsearch')['default']} */
    const FlexSearch = (require("flexsearch"));

    const index = FlexSearch.create(flexsearch)

    await walker(docs)
    const outputs = [output].flat()
    for (const output of outputs) {
        outputFileSync(output, (
            JSON.stringify({
                config: flexsearch,
                dump: index.export({ serialize: false })
            })
        ))
    }

    async function walker(path, root) {
        root = root || path
        const files = (await readdir(path))
        const promises = files.map(async filename => {
            const filepath = resolve(path, filename)
            const file = await stat(filepath)

            if (file.isDirectory()) {
                await walker(filepath, root)
            } else if (filename.endsWith('.html')) {
                const urlPath = relative(root, filepath)
                    .replace(/\\/g, '/') //force unix paths
                    .replace(/\.html$/, '')
                    .replace(/\/index$/, '')

                const content = await readFile(filepath, 'utf-8')
                const doc = cheerio.load(content)
                const data = await scrape.bind(config)(doc, path, config)
                if (data) {
                    console.log(`[poindexter] indexed ${urlPath}`)
                    index.add([{ path: urlPath, ...data }])
                }
                else
                    console.log(`[poindexter] skipped ${urlPath}`)
            }
        })
        await Promise.all(promises)
    }
}

module.exports.poindexter = poindexter