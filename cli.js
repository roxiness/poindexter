#!/usr/bin/env node

const program = require('commander');


(async function cli() {
    const _defaults = require('./defaults')
    const { configent } = require('configent')
    const defaults = configent(_defaults, {}, { useDetectDefaults: true })

    function commaSeparatedList(value, dummyPrevious) {
        return value.split(',');
    }

    program
        .option('-d, --debug', 'extra debugging')
        .option('-D, --docs <path>', 'path to HTML documents', defaults.docs)
        .option('-o, --output <path>', 'path to output search dump', defaults.output)
        .option('-c, --content-selectors <selectors>', 'content selectors', commaSeparatedList, defaults.contentSelectors)

        .action(program => {
            const options = program.opts()
            require('./poindexter').poindexter({ ...defaults, ...options})
        })

    program.parse(process.argv)
})()
