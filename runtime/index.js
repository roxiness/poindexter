import FlexSearch from 'flexsearch'

export const client = {
    fetch(path = '/searchify.dump.json') {
        return fetch(path).then(res => res.json())
    },
    async init(path) {
        const { config, dump } = await this.fetch(path)
        const index = FlexSearch.create(config)
        index.import(dump, { serialize: false })
        return index
    }
}