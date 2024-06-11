import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from 'openai/resources'

import {
  addAppendedMessages,
  addOverrideMessages,
  getMissingPromptVariables,
  mapOpenAIMessagesToMessages,
  mapPromptToOpenAIConfig,
  renderPromptWithVariables,
  validatePromptVariables
} from '../helpers'
import { api } from '../openapi/client'
import { PromptConfiguration, PromptConfigurationBody, PromptMessage } from '../types'

export default class Prompts {
  private client: typeof api

  private apiKey: string

  constructor({ client, apiKey }: { apiKey: string; client: typeof api }) {
    this.client = client
    this.apiKey = apiKey
  }

  public async getRaw({ id }: { id: string }): Promise<PromptConfiguration> {
    return this.client.getPrompt({ params: { promptId: id }, headers: { 'X-API-KEY': this.apiKey } })
  }

  public async get({
    id,
    variables,
    appendMessages,
    overrideMessages
  }: {
    id: string
    variables: Record<string, string>
    appendMessages?: PromptMessage[]
    overrideMessages?: PromptMessage[]
    userId?: string
  }): Promise<PromptConfiguration> {
    const result = await this.getRaw({ id })

    if (!validatePromptVariables(result, variables)) {
      const missingVariables = getMissingPromptVariables(result, variables)
      throw new Error(`Missing variables in prompt: ${missingVariables.join(', ')}`)
    }

    const updatedWithVariables = renderPromptWithVariables(result, variables)

    if (overrideMessages) {
      return addOverrideMessages(updatedWithVariables, overrideMessages)
    }

    if (appendMessages) {
      return addAppendedMessages(updatedWithVariables, appendMessages)
    }

    return updatedWithVariables
  }

  public async getOpenAi({
    id,
    variables,
    user,
    appendMessages,
    overrideMessages
  }: {
    id: string
    variables: Record<string, string>
    appendMessages?: ChatCompletionMessageParam[]
    overrideMessages?: ChatCompletionMessageParam[]
    user?: string
  }): Promise<ChatCompletionCreateParamsNonStreaming> {
    const appendMessagesMapped = appendMessages ? mapOpenAIMessagesToMessages(appendMessages) : undefined
    const overrideMessagesMapped = overrideMessages ? mapOpenAIMessagesToMessages(overrideMessages) : undefined

    const updatedWithVariables = await this.get({
      id,
      variables,
      appendMessages: appendMessagesMapped,
      overrideMessages: overrideMessagesMapped
    })

    return mapPromptToOpenAIConfig(updatedWithVariables, {
      user
    })
  }

  public create(data: PromptConfigurationBody): Promise<PromptConfiguration> {
    return this.client.createPrompt(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public update({ id }: { id: string }, data: PromptConfigurationBody): Promise<PromptConfiguration> {
    return this.client.updatePrompt(data, {
      params: { promptId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async delete({ id }: { id: string }): Promise<null> {
    await this.client.deletePrompt(undefined, {
      params: { promptId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }
}
