import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionRole,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption
} from 'openai/resources'

import { PromptConfiguration, PromptMessage, PromptTool } from '../types'

export const mapMessagesToOpenAI = (messages: PromptMessage[]): ChatCompletionMessageParam[] => {
  return messages.map((message): ChatCompletionMessageParam => {
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

export const mapToolChoiceToOpenAI = (tools: PromptTool[], toolChoice?: string | null): ChatCompletionToolChoiceOption | undefined => {
  if (tools.length === 0) {
    return undefined
  }
  if (toolChoice === 'auto' || (!toolChoice && tools.length !== 0)) {
    return 'auto'
  }
  if (toolChoice === 'none') {
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

const getTools = (tools: PromptTool[]): ChatCompletionTool[] | undefined => {
  if (tools.length === 0) {
    return undefined
  }

  return tools.map((tool) => mapToolToOpenAi(tool))
}

export const mapPromptToOpenAIConfig = (promptConfig: PromptConfiguration): ChatCompletionCreateParamsNonStreaming => {
  const { messages: promptMessages, parameters, tools } = promptConfig

  const messages = mapMessagesToOpenAI(promptMessages)

  return {
    messages,
    model: parameters.modelName,
    top_p: parameters.topP,
    max_tokens: parameters.maxTokens,
    temperature: parameters.temperature,
    seed: parameters.seed,
    presence_penalty: parameters.presencePenalty,
    frequency_penalty: parameters.frequencyPenalty,
    tool_choice: mapToolChoiceToOpenAI(tools, parameters.toolChoice),
    response_format: {
      type: parameters.responseFormat === 'JSON' ? 'json_object' : 'text'
    },
    tools: getTools(tools)
  }
}
