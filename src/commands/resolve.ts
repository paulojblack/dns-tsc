import * as dns from 'dns';
import {Command, Flags} from '@oclif/core'

export default class Resolve extends Command {
  static description = 'Resolve a given DNS record (default ANY) for a URL'

  static examples = [
      '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
      nameServer: Flags.string({char: 'n', description: 'Name server to use'}),
      resourceRecord: Flags.string({char: 'r', description: 'Resource record to request'})
  }

  static args = [
      {name: 'domain', description: 'Domain to resolve', required: true}
  ]

  public async run(): Promise<void> {
      const {args, flags} = await this.parse(Resolve)
      const { domain } = args;
      const { resourceRecord, nameServer } = flags;
      let result = await this.resolveDNS(domain, resourceRecord, nameServer)
      this.log(result);
  }

  private async resolveDNS(domain: string, resourceRecord: string = 'ANY', nameServer: string = '8.8.8.8'): Promise<any> {
    console.log(domain, resourceRecord, nameServer)
    const { Resolver } = dns.promises;
    const resolver = new Resolver()
    if (nameServer) {
      resolver.setServers([nameServer])
    }

    let result

    try {
      result = await resolver.resolve(domain, resourceRecord)
    } catch (error: any) {
      throw new Error(error)
    }

    return result
  }
}
