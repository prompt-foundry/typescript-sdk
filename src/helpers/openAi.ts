import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionFunctionMessageParam,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionRole,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption,
  ChatCompletionToolMessageParam
} from 'openai/resources'

import { PromptConfiguration, PromptMessage, PromptMessageRole, PromptTool } from '../types'

export const mapMessagesToOpenAIMessages = (messages: PromptMessage[]): ChatCompletionMessageParam[] => {
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

function isToolMessage(message: ChatCompletionMessageParam): message is ChatCompletionToolMessageParam {
  return message.role === 'tool'
}

function isFunctionMessage(message: ChatCompletionMessageParam): message is ChatCompletionFunctionMessageParam {
  return message.role === 'tool'
}

function isAssistantMessage(message: ChatCompletionMessageParam): message is ChatCompletionAssistantMessageParam {
  return message.role === 'assistant'
}

export const mapOpenAIMessagesToMessages = (messages: ChatCompletionMessageParam[]): PromptMessage[] => {
  return messages.map((message): PromptMessage => {
    const role = message.role.toUpperCase() as PromptMessageRole

    if (isToolMessage(message)) {
      if (!message.tool_call_id) {
        throw new Error('Tool call missing tool call id')
      }

      if (!message.content) {
        throw new Error('Tool message missing content')
      }
      return {
        role,
        content: message.content,
        toolCallId: message.tool_call_id,
        toolCalls: null
      }
    }

    if (isFunctionMessage(message)) {
      if (!message.name) {
        throw new Error('Function call missing name')
      }

      if (!message.content) {
        throw new Error('Tool message missing content')
      }
      return {
        role: 'TOOL',
        content: message.content,
        toolCallId: message.name,
        toolCalls: null
      }
    }

    if (isAssistantMessage(message)) {
      const toolCalls: PromptMessage['toolCalls'] =
        message.tool_calls?.map((toolCall) => {
          return {
            toolCallId: toolCall.id,
            type: toolCall.type,
            function: {
              name: toolCall.function.name,
              arguments: toolCall.function.arguments
            }
          }
        }) || null

      return {
        role,
        content: message.content as string,
        name: undefined,
        toolCallId: null,
        toolCalls
      }
    }

    if (role === 'USER') {
      if (!message.content) {
        throw new Error('User message missing content')
      }

      return {
        role,
        name: undefined,
        content: message.content as string,
        toolCallId: null,
        toolCalls: null
      }
    }

    if (role === 'SYSTEM') {
      if (!message.content) {
        throw new Error('System message missing content')
      }

      return {
        role,
        content: message.content as string,
        toolCallId: null,
        toolCalls: null
      }
    }

    throw new Error(`Invalid message role: ${role as string}`)
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

export const mapPromptToOpenAIConfig = (
  promptConfig: PromptConfiguration,
  { user }: { user?: string } = {}
): ChatCompletionCreateParamsNonStreaming => {
  const { messages: promptMessages, parameters, tools } = promptConfig

  const messages = mapMessagesToOpenAIMessages(promptMessages)

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
    tools: getTools(tools),
    user
  }
}
