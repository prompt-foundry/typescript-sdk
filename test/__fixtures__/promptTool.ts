import { PromptTool } from '../../src'

export const createPromptToolFixture = (overrides: Partial<PromptTool> = {}): PromptTool => ({
  toolId: 'toolId',
  description: 'description',
  name: 'name',
  parameters: {},
  ...overrides
})
