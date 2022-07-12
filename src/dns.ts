// import { Command, CommanderError } from "../node_modules/commander/typings/index";

const { Resolver } = require('dns').promises
const { Command } = require('commander');

function cli() {
    const program = new Command()

    program
        .name('dns-tsc')
        .description('Toy DNS resolver in TSC')
        .version('0.1.0')

    program.command('resolve')
        .description('Resolve a given DNS record (default A) for a URL')
        .argument('<string> Domain to resolve')
        .action((url: string, opts: any) => {
            console.log(url)
            console.log(opts)
        })
        // .option('-u, --url <char>')
        // .option('-u, --url')
    
    program.parse()
}

async function resolveDNS (url: string) {
    let resolver = new Resolver();
    resolver.setServers(['8.8.8.8']);

    let domainParts: Array<string> = url.split('.');
    
    for (let dmnPartIdx = domainParts.length - 1; dmnPartIdx >= 0; dmnPartIdx--) {
        
    }

    let r = await resolver.resolveNs(url);

    return r
}

// (async () => {
//     let res = await resolveDNS('google.com.')
//     console.log(res)
// })()

cli()