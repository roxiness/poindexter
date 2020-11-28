/** @ts-ignore */
/** @type {import('flexsearch')['default']} */
const FlexSearch = (require("flexsearch"));
const browserPath = 'poindexter.bundle.json'
const { resolve } = require('path')


module.exports.client = {
    index: null,
    fetch: async path => {
        path = path || browserPath
        if (typeof fetch === 'function')
            return await fetch(path).then(res => res.json())
        else return require(resolve(path))
    },
    async init({ path } = { path: browserPath }) {
        const { config, dump } = await this.fetch(path)
        const index = FlexSearch.create(config)
        index.import(dump, { serialize: false })
        this.index = index
        return index
    }
}