import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
  ChatCompletionRole,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption
} from 'openai/resources'

import { PromptConfiguration, PromptMessage, PromptTool } from '../types'

export const mapMessagesToOpenAI = (promptMessages: PromptMessage[]): ChatCompletionMessageParam[] => {
  return promptMessages.map((message) => ({
    role: message.role.toLowerCase() as ChatCompletionRole,
    content: message.content
  })) as ChatCompletionMessageParam[]
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
