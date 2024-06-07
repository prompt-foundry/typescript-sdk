import { PromptTool } from '../../types'

export const createPromptToolFixture = (overrides: Partial<PromptTool> = {}): PromptTool => ({
  id: 'toolId',
  description: 'description',
  name: 'name',
  parameters: {},
  ...overrides
})
