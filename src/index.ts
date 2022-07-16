const dns =  require('dns').promises
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
        .description('Resolve a given DNS record (default ANY) for a URL')
        .addArgument(new commander.Argument('[domain]', 'Domain to resolve'))
        .addArgument(new commander.Argument('[recordType]', 'DNS Record').choices(resourceRecords))
        .option('-n, --name-server <string>', 'Name server to request DNS')
        .action(async (domain: string, recordType: string, opts: CLIOpts): Promise<void> => {
            let result = await resolveDNS(domain, recordType, opts.nameServer);
            console.log(result)
        })

    program.command('reverse')
        .description('Reverse DNS query to resolve an IP into a list of host names')
        .addArgument(new commander.Argument('[ip]', 'IP to resolve'))
        .action(async (ip: string): Promise<void> => {
            let result = await reverseDNS(ip);
            console.log(result)
        })
        
    program.parse()
}

async function resolveDNS (domain: string, recordType: string = 'ANY', nameServer: string = '8.8.8.8') {
    let resolver = new dns.Resolver();
    resolver.setServers([nameServer]);
    
    let result;
    try {
        result = await resolver.resolve(domain, recordType);
    } catch(e: any) {
        throw new Error(e)
    }

    return result;
}

async function reverseDNS (ip: string) {
    let result;
    try {
        result = await dns.reverse(ip);
    } catch(e: any) {
        throw new Error(e)
    }

    return result;
}

cli();
