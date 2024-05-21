import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam, ChatCompletionRole } from 'openai/resources'

import { PromptConfiguration, PromptMessage } from '../types'

export const mapMessagesToOpenAI = (promptMessages: PromptMessage[]): ChatCompletionMessageParam[] => {
  return promptMessages.map((message) => ({
    role: message.role.toLowerCase() as ChatCompletionRole,
    content: message.content
  })) as ChatCompletionMessageParam[]
}

export const mapPromptToOpenAIConfig = (promptInstance: PromptConfiguration): ChatCompletionCreateParamsNonStreaming => {
  const { promptMessages, promptParameters } = promptInstance

  const messages = mapMessagesToOpenAI(promptMessages)

  return {
    messages,
    model: promptParameters.modelName,
    top_p: promptParameters.topP,
    max_tokens: promptParameters.maxTokens,
    temperature: promptParameters.temperature,
    seed: promptParameters.seed,
    presence_penalty: promptParameters.presencePenalty,
    frequency_penalty: promptParameters.frequencyPenalty,
    response_format: {
      type: promptParameters.responseFormat === 'json' ? 'json_object' : 'text'
    }
  }
}
