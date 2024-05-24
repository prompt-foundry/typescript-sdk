import { createPromptConfigurationFixture } from '../../test/__fixtures__/promptConfiguration'
import { createPromptMessageFixture } from '../../test/__fixtures__/promptMessage'
import { createPromptToolFixture } from '../../test/__fixtures__/promptTool'
import { PromptMessageRoleEnum, PromptTool } from '../../types'
import { mapMessagesToOpenAI, mapPromptToOpenAIConfig, mapToolChoiceToOpenAI } from '../openAi'

describe('openAi helpers', () => {
  describe('mapMessagesToOpenAI', () => {
    const mockMessages = [
      createPromptMessageFixture({ role: PromptMessageRoleEnum.TOOL, content: 'content1', toolCallId: 'id1' }),
      createPromptMessageFixture({ role: PromptMessageRoleEnum.ASSISTANT, content: 'content2' }),
      createPromptMessageFixture({ role: PromptMessageRoleEnum.USER, content: 'content3' }),
      createPromptMessageFixture({ role: PromptMessageRoleEnum.SYSTEM, content: 'content4' })
    ]

    it('should correctly map tool messages', () => {
      const result = mapMessagesToOpenAI([mockMessages[0]])
      expect(result[0]).toEqual({
        role: 'tool',
        content: 'content1',
        tool_call_id: 'id1'
      })
    })

    it('should correctly map assistant messages', () => {
      const result = mapMessagesToOpenAI([mockMessages[1]])
      expect(result[0]).toEqual({
        role: 'assistant',
        content: 'content2',
        name: undefined,
        tool_calls: undefined
      })
    })

    it('should correctly map user messages', () => {
      const result = mapMessagesToOpenAI([mockMessages[2]])
      expect(result[0]).toEqual({
        role: 'user',
        name: undefined,
        content: 'content3'
      })
    })

    it('should correctly map system messages', () => {
      const result = mapMessagesToOpenAI([mockMessages[3]])
      expect(result[0]).toEqual({
        role: 'system',
        content: 'content4'
      })
    })

    it('should throw an error for invalid message roles', () => {
      expect(() => mapMessagesToOpenAI([createPromptMessageFixture({ role: 'invalid', content: 'content5' } as any)])).toThrow(
        'Invalid message role: invalid'
      )
    })

    // Additional test cases for missing fields and other edge cases can be added here.
  })

  describe('mapPromptToOpenAIConfig', () => {
    it('should map the configuration to OpenAI parameters correctly', () => {
      const result = mapPromptToOpenAIConfig(createPromptConfigurationFixture())
      expect(result).toMatchSnapshot()
    })

    it('should map the configuration to OpenAI parameters correctly - tools', () => {
      const result = mapPromptToOpenAIConfig(
        createPromptConfigurationFixture({
          promptTools: [createPromptToolFixture({ name: 'exampleTool' })]
        })
      )
      expect(result).toMatchSnapshot()
    })

    // Additional test cases to test other configurations and scenarios can be added here.
  })

  describe('mapToolChoiceToOpenAI', () => {
    it('should return "auto" if toolChoice is "auto" or there are tools available and toolChoice is undefined', () => {
      const tools = [createPromptToolFixture()]
      expect(mapToolChoiceToOpenAI(tools, 'auto')).toBe('auto')
      expect(mapToolChoiceToOpenAI(tools)).toBe('auto')
    })

    it('should return "none" if there are no tools or toolChoice is "none"', () => {
      const tools: PromptTool[] = []
      expect(mapToolChoiceToOpenAI(tools, 'none')).toBe(undefined)
      expect(mapToolChoiceToOpenAI(tools)).toBe(undefined)
      expect(mapToolChoiceToOpenAI(tools, 'auto')).toBe(undefined)
    })

    it('should return tool function object if a valid toolChoice matches a tool', () => {
      const tools = [createPromptToolFixture({ name: 'exampleTool' })]
      expect(mapToolChoiceToOpenAI(tools, 'exampleTool')).toEqual({
        type: 'function',
        function: { name: 'exampleTool' }
      })
    })

    it('should return "none" if the toolChoice does not match any tool', () => {
      const tools = [createPromptToolFixture({ name: 'exampleTool' })]
      expect(mapToolChoiceToOpenAI(tools, 'nonexistentTool')).toBe('none')
    })
  })
})
