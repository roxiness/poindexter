/** @ts-ignore */
/** @type {import('flexsearch')['default']} */
const FlexSearch = (require("flexsearch"));
const defaults = { path: '/poindexter.bundle.json' }

module.exports.client = {
    index: null,
    fetch: async path => {
        path = path || defaults.path
        if (typeof fetch === 'function')
            return await fetch(path).then(res => res.json())
        else return require(eval("require")('path').resolve(path))
    },
    async init({ path } = defaults) {
        const { config, dump } = await this.fetch(path)
        const index = FlexSearch.create(config)
        index.import(dump, { serialize: false })
        this.index = index
        return index
    }
}