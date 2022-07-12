// https://www.npmjs.com/package/dns-packet
const { Resolver } = require('dns').promises
const commander = require('commander');

let resourceRecords: Array<string> = ['A', 'AAAA', 'ANY', 'CAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'];
interface CLIOpts {
    nameServer: string
}

function cli() {
    const program = new commander.Command()

    program
        .name('dns-tsc')
        .description('Toy DNS resolver in TSC')
        .version('0.1.0')

    program.command('resolve')
        .description('Resolve a given DNS record (default A) for a URL')
        .addArgument(new commander.Argument('[domain]', 'Domain to resolve'))
        .addArgument(new commander.Argument('[recordType]', 'DNS Record').choices(resourceRecords))
        .option('-n, --name-server <string>', 'Name server to request DNS')
        .action(async (domain: string, recordType: string, opts: CLIOpts): Promise<void> => {
            let result = await resolveDNS(domain, recordType, opts);
            console.log(result)

        })
        
    program.parse()
}

async function resolveDNS (domain: string, recordType: string, opts: CLIOpts) {
    let resolver = new Resolver();
    if (opts.nameServer) {
        resolver.setServers([opts.nameServer]);
    }
    let result;

    try {
        result = await resolver.resolve(domain, recordType);
    } catch(e: any) {
        throw new Error(e)
    }

    return result;
}

cli();