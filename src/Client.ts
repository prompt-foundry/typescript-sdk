import APIClient from './ApiClient'
import { Prompt } from './types/Prompt'

export default class PromptFoundry {
  private client: APIClient

  constructor({ apiKey }: { apiKey: string }) {
    // @ts-expect-error - protect against missing apiKey for js consumers
    if (apiKey === '' || apiKey === undefined || apiKey === null || apiKey === 0) {
      throw new Error('Prompt Foundry API Key is required!')
    }

    this.client = new APIClient({
      baseURL: 'https://api.promptfoundry.com',
      apiToken: apiKey
    })
  }

  public async getPrompt({ promptId }: { promptId: string }): Promise<Prompt> {
    return this.client.get<Prompt>(`/prompts/${promptId}`)
  }
}
