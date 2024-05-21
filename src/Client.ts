import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources'

import APIClient from './ApiClient'
import { mapPromptToOpenAIConfig } from './helpers/openAi'
import { PromptConfiguration } from './types'

export default class PromptFoundry {
  private client: APIClient

  constructor({ apiKey }: { apiKey: string }) {
    // @ts-expect-error - protect against missing apiKey for js consumers
    if (apiKey === '' || apiKey === undefined || apiKey === null || apiKey === 0) {
      throw new Error('Prompt Foundry API Key is required!')
    }

    this.client = new APIClient({
      baseURL: 'https://api.promptfoundry.ai/sdk/v1',
      apiToken: apiKey
    })
  }

  public async getPrompt({ promptId }: { promptId: string }): Promise<PromptConfiguration> {
    return this.client.get<PromptConfiguration>(`/prompts/${promptId}`)
  }

  public async getOpenAiPrompt({ promptId }: { promptId: string }): Promise<ChatCompletionCreateParamsNonStreaming> {
    const result = await this.client.get<PromptConfiguration>(`/prompts/${promptId}`)

    return mapPromptToOpenAIConfig(result)
  }
}
