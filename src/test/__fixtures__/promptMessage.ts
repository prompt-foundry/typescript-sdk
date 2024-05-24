import { PromptMessage, PromptMessageRoleEnum } from '../../types'

export const createPromptMessageFixture = (overrides: Partial<PromptMessage> = {}): PromptMessage => ({
  content: 'Hello world',
  role: PromptMessageRoleEnum.USER,
  toolCallId: null,
  toolCalls: null,
  ...overrides
})
