import * as dns from 'dns';
import {Command, Flags} from '@oclif/core'

export default class Resolve extends Command {
  static description = 'Resolve a given DNS record (default A) for a URL'

  static examples = [
      '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
      nameServer: Flags.string({char: 'n', description: 'Name server to use'}),
  }

  static args = [
      {name: 'domain', description: 'Domain to resolve', required: true},
      {name: 'resourceRecord', description: 'DNS record', required: true},
  ]

  public async run(): Promise<void> {
      const {args, flags} = await this.parse(Resolve)
      console.log(args)
      console.log(flags)
  }

  private async resolveDNS(domain: string, recordType: string, nameServer: string): Promise<any> {
    const { Resolver } = dns.promises;
    const resolver = new Resolver()
    if (nameServer) {
      resolver.setServers([nameServer])
    }

    let result

    try {
      result = await resolver.resolve(domain, recordType)
    } catch (error: any) {
      throw new Error(error)
    }

    return result
  }
}
