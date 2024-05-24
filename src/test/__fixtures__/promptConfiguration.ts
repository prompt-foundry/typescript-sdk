import { PromptConfiguration } from '../../types'

import { createPromptMessageFixture } from './promptMessage'

export const createPromptConfigurationFixture = (overrides: Partial<PromptConfiguration> = {}): PromptConfiguration => ({
  promptId: 'promptId',
  promptMessages: [createPromptMessageFixture()],
  promptParameters: {
    modelName: 'text-davinci-002',
    topP: 0.5,
    maxTokens: 150,
    temperature: 0.7,
    seed: 42,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1,
    toolChoice: 'auto',
    responseFormat: 'JSON'
  },
  promptTools: [],
  ...overrides
})
