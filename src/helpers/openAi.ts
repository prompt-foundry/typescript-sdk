import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionRole,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption
} from 'openai/resources'

import { PromptConfiguration, PromptMessage, PromptTool } from '../types'

export const mapMessagesToOpenAI = (promptMessages: PromptMessage[]): ChatCompletionMessageParam[] => {
  return promptMessages.map((message): ChatCompletionMessageParam => {
    const role = message.role.toLowerCase() as ChatCompletionRole
    if (role === 'tool') {
      if (!message.toolCallId) {
        throw new Error('Tool call missing tool call id')
      }

      if (!message.content) {
        throw new Error('Tool message missing content')
      }

      return {
        role,
        content: message.content,
        tool_call_id: message.toolCallId
      }
    }
    if (role === 'assistant') {
      return {
        role,
        content: message.content,
        name: undefined,
        tool_calls: message.toolCalls?.map((toolCall): ChatCompletionMessageToolCall => {
          return {
            id: toolCall.toolCallId,
            type: toolCall.type,
            function: toolCall.function
          }
        })
      }
    }

    if (role === 'user') {
      if (!message.content) {
        throw new Error('User message missing content')
      }

      return {
        role,
        name: undefined,
        content: message.content
      }
    }

    if (role === 'system') {
      if (!message.content) {
        throw new Error('System message missing content')
      }

      return {
        role,
        content: message.content
      }
    }

    throw new Error(`Invalid message role: ${role}`)
  })
}

const mapToolChoiceToOpenAI = (tools: PromptTool[], toolChoice?: string | null): ChatCompletionToolChoiceOption => {
  if (toolChoice === 'auto' || (!toolChoice && tools.length !== 0)) {
    return 'auto'
  }
  if (toolChoice === 'none' || tools.length === 0) {
    return 'none'
  }

  if (toolChoice) {
    const tool = tools.find((t) => t.name === toolChoice)
    if (tool) {
      return {
        type: 'function',
        function: {
          name: tool.name
        }
      }
    }
  }

  return 'none'
}

const mapToolToOpenAi = (tool: PromptTool): ChatCompletionTool => {
  return {
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters
    }
  }
}

export const mapPromptToOpenAIConfig = (promptConfig: PromptConfiguration): ChatCompletionCreateParamsNonStreaming => {
  const { promptMessages, promptParameters, promptTools } = promptConfig

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
    tool_choice: mapToolChoiceToOpenAI(promptTools, promptParameters.toolChoice),
    response_format: {
      type: promptParameters.responseFormat === 'JSON' ? 'json_object' : 'text'
    },
    tools: promptTools.map((tool) => mapToolToOpenAi(tool))
  }
}
