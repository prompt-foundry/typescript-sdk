export type responseFormat = {
  type: 'text' | 'json_object'
}

export type PromptParameters = {
  frequencyPenalty: number
  maxTokens?: number
  modelName: string
  presencePenalty: number
  responseFormat: responseFormat
  seed?: number
  temperature: number
  topP: number
}

export enum PromptMessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  TOOL = 'tool',
  SYSTEM = 'system'
}

export type PromptMessage = {
  content: string
  role: PromptMessageRole
}

export type Prompt = {
  promptId: string
  promptParameters: PromptParameters
  promptMessages: PromptMessage[]
}
