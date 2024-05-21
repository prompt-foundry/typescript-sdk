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

  public async getRawPrompt({ promptId }: { promptId: string }): Promise<PromptConfiguration> {
    return this.client.get<PromptConfiguration>(`/prompts/${promptId}`)
  }

  public async getPrompt({ promptId, variables }: { promptId: string; variables: Record<string, string> }): Promise<PromptConfiguration> {
    const result = await this.getRawPrompt({ promptId })

    if (!validatePromptVariables(result, variables)) {
      const missingVariables = getMissingPromptVariables(result, variables)
      throw new Error(`Missing variables in prompt: ${missingVariables.join(', ')}`)
    }
    return renderPromptWithVariables(result, variables)
  }

  public async getOpenAiPrompt({
    promptId,
    variables
  }: {
    promptId: string
    variables: Record<string, string>
  }): Promise<ChatCompletionCreateParamsNonStreaming> {
    const updatedWithVariables = await this.getPrompt({ promptId, variables })

    return mapPromptToOpenAIConfig(updatedWithVariables)
  }
}
