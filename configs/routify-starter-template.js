module.exports = {
    name: 'Routify Starter Template',
    condition: ({ pkgjson }) => pkgjson.dependencies['@roxi/routify'],
    config: () => ({ 
        output: 'assets/_searchify-dump.json'
     })
}