/** @ts-ignore */
/** @type {import('flexsearch')['default']} */
const FlexSearch = (require("flexsearch"));
const { existsSync, rmdirSync, readFileSync } = require('fs')
const test = require('ava').default
const { poindexter } = require('../../poindexter')
const { client } = require('../../runtime')
process.chdir(__dirname)

let dump, config, index


test.serial('it creates a poindexter.bundle.json', async t => {
    rmdirSync('output', { recursive: true })
    await poindexter({
        docs: 'html',
        output: 'output/poindexter.bundle.json',
        title: x => 'title',
        description: x => 'desc',
        keywords: x => ['foo', 'bar'],
        ignoreSelectors: ['.ignored']
    });
    ({ dump, config } = require('./output/poindexter.bundle.json'))

    index = FlexSearch.create(config)
    index.import(dump, { serialize: false })
    t.assert(existsSync('output/poindexter.bundle.json'))
})


test('returns multiple results', async t => {
    const universalQuery = index.search({
        query: 'hello'
    }).map(e => e.path)

    t.is(universalQuery.length, 4, 'all pages should be indexed for "hello"')
    // t.is(universalQuery[0], 'hello', 'hello should be weighted to the top of the list')
})

test('unique content returns single result', async t => {
    const limitedQuery = index.search({
        query: 'blog'
    }).map(e => e.path)

    t.deepEqual(limitedQuery, ['blog'])

})

test('partial searches', t => {
    const partialQuery = index.search({
        query: 'blo'
    }).map(e => e.path)

    t.deepEqual(partialQuery, ['blog'])
})

test('fuzzy searches', t => {
    const fuzzyQuery = index.search({
        query: 'blogg'
    }).map(e => e.path)

    t.deepEqual(fuzzyQuery, ['blog'])
})

test('ignored content is not indexed', t => {
    const fuzzyQuery = index.search({
        query: 'ignored'
    }).map(e => e.path)

    t.deepEqual(fuzzyQuery, [])
})

test('runtime module', async t => {
    await client.init({ path: 'output/poindexter.bundle.json' })
    const limitedQuery = client.index.search({ query: 'blog' }).map(e => e.path)
    t.deepEqual(limitedQuery, ['blog'])
})