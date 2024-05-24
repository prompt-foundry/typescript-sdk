import { PromptTool } from '../../types'

export const createPromptToolFixture = (overrides: Partial<PromptTool> = {}): PromptTool => ({
  toolId: 'toolId',
  description: 'description',
  name: 'name',
  parameters: {},
  ...overrides
})
