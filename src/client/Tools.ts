import { api } from '../openapi/client'
import { PromptTool, PromptToolBody } from '../types'

export default class Tools {
  private client: typeof api

  private apiKey: string

  constructor({ client, apiKey }: { apiKey: string; client: typeof api }) {
    this.client = client
    this.apiKey = apiKey
  }

  public create(data: PromptToolBody): Promise<PromptTool> {
    return this.client.createTool(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public update({ id }: { id: string }, data: PromptToolBody): Promise<PromptTool> {
    return this.client.updateTool(data, {
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async delete({ id }: { id: string }): Promise<null> {
    await this.client.deleteTool(undefined, {
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public get({ id }: { id: string }): Promise<PromptTool> {
    return this.client.getTool({
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public list(): Promise<PromptTool[]> {
    return this.client.getTools({
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }
}
