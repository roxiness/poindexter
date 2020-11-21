module.exports = {
    flexsearch: {
        doc: {
            id: 'path',
            field: 'text'
        },
        encode: 'advanced'
    },
    docs: 'dist',
    output: 'searchify.dump.json',
    contentSelectors: [
        'main main', 'main',
        '.container .container', '.container'
    ],
    title: $ => $('title').text().trim(),
    description: $ => $('meta[name=description]').attr('content'),
    keywords: $ => $('meta[name=keywords]').attr('content').split(','),
    scrape: async ($, path, cfg) => {
        const title = cfg.title($)
        const description = cfg.description($)
        const keywords = cfg.keywords($)

        // we use the text from the first matching content selector
        for (const qs of cfg.contentSelectors) {
            const text = $(qs).text()
            if (text)
                return { text, title, description, keywords }
        }
    }
}