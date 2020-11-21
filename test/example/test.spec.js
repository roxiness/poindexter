/** @ts-ignore */
/** @type {import('flexsearch')['default']} */
const FlexSearch = (require("flexsearch"));
const { existsSync, rmdirSync, readFileSync } = require('fs')
const test = require('ava').default
const { searchify } = require('../../searchify')
process.chdir(__dirname)



test.serial('it creates a flexdump.json', async t => {
    rmdirSync('output', { recursive: true })
    await searchify({
        docs: 'html',
        output: 'output/flexdump.json',
        title: x => 'title',
        description: x => 'desc',
        keywords: x => ['foo', 'bar'],
    })
    t.assert(existsSync('output/flexdump.json'))
})

test.serial('flexdump.json is readable', async t => {
    const {dump, config} = require('./output/flexdump.json')
    const index = FlexSearch.create(config)

    index.import(dump, {serialize: false})

    const universalQuery = index.search({
        query: 'hello'
    }).map(e => e.path)

    t.is(universalQuery.length, 4, 'all pages should be indexed for "hello"')
    t.is(universalQuery[0], 'hello', 'hello should be weighted to the top of the list')

    const limitedQuery = index.search({
        query: 'blog'
    }).map(e => e.path)

    t.deepEqual(limitedQuery, ['blog'])

    const partialQuery = index.search({
        query: 'blo'
    }).map(e => e.path)

    t.deepEqual(partialQuery, ['blog'])

    const fuzzyQuery = index.search({
        query: 'blogg'
    }).map(e => e.path)

    t.deepEqual(fuzzyQuery, ['blog'])

})