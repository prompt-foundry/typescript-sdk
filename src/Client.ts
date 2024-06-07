import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources'

import APIClient from './ApiClient'
import { getMissingPromptVariables, renderPromptWithVariables, validatePromptVariables } from './helpers'
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

  public async getRawPrompt({ id }: { id: string }): Promise<PromptConfiguration> {
    return this.client.get<PromptConfiguration>(`/prompts/${id}`)
  }

  public async getPrompt({ id, variables }: { id: string; variables: Record<string, string> }): Promise<PromptConfiguration> {
    const result = await this.getRawPrompt({ id })

    if (!validatePromptVariables(result, variables)) {
      const missingVariables = getMissingPromptVariables(result, variables)
      throw new Error(`Missing variables in prompt: ${missingVariables.join(', ')}`)
    }
    return renderPromptWithVariables(result, variables)
  }

  public async getOpenAiPrompt({
    id,
    variables
  }: {
    id: string
    variables: Record<string, string>
  }): Promise<ChatCompletionCreateParamsNonStreaming> {
    const updatedWithVariables = await this.getPrompt({ id, variables })

    return mapPromptToOpenAIConfig(updatedWithVariables)
  }
}
