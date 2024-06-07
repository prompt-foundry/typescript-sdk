import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from 'openai/resources'

import { addAppendedMessages, addOverrideMessages, getMissingPromptVariables, renderPromptWithVariables, validatePromptVariables } from './helpers'
import { mapOpenAIMessagesToMessages, mapPromptToOpenAIConfig } from './helpers/openAi'
import { api, createApiClient } from './openapi/client'
import {
  Evaluation,
  EvaluationBody,
  EvaluationGroup,
  EvaluationGroupBody,
  PromptConfiguration,
  PromptConfigurationBody,
  PromptMessage,
  PromptTool,
  PromptToolBody
} from './types'

const BASE_URL = 'https://api.promptfoundry.ai/sdk/v1'

export default class PromptFoundry {
  private client: typeof api

  private apiKey: string

  constructor({ apiKey, baseUrl = BASE_URL }: { apiKey: string; baseUrl?: string }) {
    // @ts-expect-error - protect against missing apiKey for js consumers
    if (apiKey === '' || apiKey === undefined || apiKey === null || apiKey === 0) {
      throw new Error('Prompt Foundry API Key is required!')
    }

    this.apiKey = apiKey

    this.client = createApiClient(baseUrl)
  }

  public async getRawPrompt({ id }: { id: string }): Promise<PromptConfiguration> {
    return this.client.getPrompt({ params: { promptId: id }, headers: { 'X-API-KEY': this.apiKey } })
  }

  public async getPrompt({
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
    const result = await this.getRawPrompt({ id })

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

  public async getOpenAiPrompt({
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

    const updatedWithVariables = await this.getPrompt({
      id,
      variables,
      appendMessages: appendMessagesMapped,
      overrideMessages: overrideMessagesMapped
    })

    return mapPromptToOpenAIConfig(updatedWithVariables, {
      user
    })
  }

  public createPrompt(data: PromptConfigurationBody): Promise<PromptConfiguration> {
    return this.client.createPrompt(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public updatePrompt({ id }: { id: string }, data: PromptConfigurationBody): Promise<PromptConfiguration> {
    return this.client.updatePrompt(data, {
      params: { promptId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async deletePrompt({ id }: { id: string }): Promise<null> {
    await this.client.deletePrompt(undefined, {
      params: { promptId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public createTool(data: PromptToolBody): Promise<PromptTool> {
    return this.client.createTool(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public updateTool({ id }: { id: string }, data: PromptToolBody): Promise<PromptTool> {
    return this.client.updateTool(data, {
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async deleteTool({ id }: { id: string }): Promise<null> {
    await this.client.deleteTool(undefined, {
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public getTool({ id }: { id: string }): Promise<PromptTool> {
    return this.client.getTool({
      params: { toolId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public getTools(): Promise<PromptTool[]> {
    return this.client.getTools({
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public createEvaluationGroup(data: EvaluationGroupBody): Promise<EvaluationGroup> {
    return this.client.createEvaluationGroup(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public updateEvaluationGroup({ id }: { id: string }, data: EvaluationGroupBody): Promise<EvaluationGroup> {
    return this.client.updateEvaluationGroup(data, {
      params: { evaluationGroupId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async deleteEvaluationGroup({ id }: { id: string }): Promise<null> {
    await this.client.deleteEvaluationGroup(undefined, {
      params: { evaluationGroupId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public getEvaluationGroup({ id }: { id: string }): Promise<EvaluationGroup> {
    return this.client.getEvaluationGroup({
      params: { evaluationGroupId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public getEvaluationGroups(): Promise<EvaluationGroup[]> {
    return this.client.getEvaluationGroups({
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public createEvaluation(data: EvaluationBody): Promise<Evaluation> {
    return this.client.createEvaluation(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public updateEvaluation({ id, data }: { id: string; data: EvaluationBody }): Promise<Evaluation> {
    return this.client.updateEvaluation(data, {
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async deleteEvaluation({ id }: { id: string }): Promise<null> {
    await this.client.deleteEvaluation(undefined, {
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public getEvaluation({ id }: { id: string }): Promise<Evaluation> {
    return this.client.getEvaluation({
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public getEvaluations(): Promise<Evaluation[]> {
    return this.client.getEvaluations({
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }
}
