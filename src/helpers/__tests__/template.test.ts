import { PromptConfiguration, PromptMessageRoleEnum } from '../../types'
import {
  extractVariables,
  extractVariablesFromMessages,
  renderMessagesWithVariabels,
  renderPromptWithVariables,
  renderTemplate,
  validatePromptVariables
} from '../template'

describe('template helpers', () => {
  describe('extractVariables', () => {
    it('returns an array of template variables', () => {
      const template = 'Hello, {{name}}'
      expect(extractVariables(template)).toEqual(['name'])
    })

    it('returns an empty array - no variables', () => {
      const template = 'Hello'
      expect(extractVariables(template)).toEqual([])
    })

    it('returns an empty array - empty brackets', () => {
      const template = 'Hello {{}}'
      expect(extractVariables(template)).toEqual([])
    })

    it('returns an array of template variables - spaces', () => {
      const template = 'Hello, {{  name }}'
      expect(extractVariables(template)).toEqual(['name'])
    })

    // Test multiple different variables
    it('returns an array of multiple different template variables', () => {
      const template = 'Hello, {{name}}. Today is {{date}}.'
      expect(extractVariables(template)).toEqual(['name', 'date'])
    })

    // Test repeated variables
    it('returns an array of unique template variables - repeated variables', () => {
      const template = 'Hello, {{name}}, good morning {{name}}!'
      expect(extractVariables(template)).toEqual(['name'])
    })

    // Test variables with special characters
    it('returns variables including those with special characters', () => {
      const template = 'Error: {{error_code}} at {{timestamp}}'
      expect(extractVariables(template)).toEqual(['error_code', 'timestamp'])
    })

    // Test variables nested within text and other variables
    it('returns all variables from a complex nested template', () => {
      const template = '{{greeting}}, {{user.name}}! Your score is {{user.score.highscore}}.'
      expect(extractVariables(template)).toEqual(['greeting', 'user.name', 'user.score.highscore'])
    })

    it('handles empty string', () => {
      const template = ''
      expect(extractVariables(template)).toEqual([])
    })
  })

  describe('extractVariablesFromMessages', () => {
    it('returns an array of template variables from messages', () => {
      const messages = [{ role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}' }]
      expect(extractVariablesFromMessages(messages)).toEqual(['name'])
    })

    it('returns an array of template variables from messages - variable across mutliple messages', () => {
      const messages = [
        { role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}' },
        { role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}' }
      ]
      expect(extractVariablesFromMessages(messages)).toEqual(['name'])
    })

    it('returns an array of template variables from messages - no variables', () => {
      const messages = [
        { role: PromptMessageRoleEnum.USER, content: 'Hello' },
        { role: PromptMessageRoleEnum.USER, content: 'Hello' }
      ]
      expect(extractVariablesFromMessages(messages)).toEqual([])
    })

    it('returns an array of template variables from messages - mutliple variables', () => {
      const messages = [
        { role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}' },
        { role: PromptMessageRoleEnum.USER, content: 'Hello, {{firstName }} {{lastName}}' }
      ]
      expect(extractVariablesFromMessages(messages)).toEqual(['name', 'firstName', 'lastName'])
    })
  })

  describe('renderTemplate', () => {
    it('renders a simple template with one variable', () => {
      const template = 'Hello, {{name}}!'
      const variables = { name: 'Alice' }
      expect(renderTemplate(template, variables)).toBe('Hello, Alice!')
    })

    it('renders a template with multiple variables', () => {
      const template = 'Hello, {{name}}! Today is {{date}}.'
      const variables = { name: 'Bob', date: 'Tuesday' }
      expect(renderTemplate(template, variables)).toBe('Hello, Bob! Today is Tuesday.')
    })

    it('renders a template with undefined variables as empty strings', () => {
      const template = 'Hello, {{name}}! Your score is {{score}}.'
      const variables = { name: 'Charlie' } // score is not defined
      expect(renderTemplate(template, variables)).toBe('Hello, Charlie! Your score is .')
    })

    it('handles templates with no variables', () => {
      const template = 'Hello, world!'
      const variables = {} // No data needed
      expect(renderTemplate(template, variables)).toBe('Hello, world!')
    })

    it('ignores extra data not used in the template', () => {
      const template = 'Hello, {{name}}!'
      const variables = { name: 'Diana', unused: 'data' }
      expect(renderTemplate(template, variables)).toBe('Hello, Diana!')
    })

    it('renders correctly with spaces around variable names', () => {
      const template = 'Hello, {{ name }}!'
      const variables = { name: 'Eve' }
      expect(renderTemplate(template, variables)).toBe('Hello, Eve!')
    })

    it('returns original template on empty context for non-empty placeholders', () => {
      const template = 'Hello, {{name}}!'
      const variables = {} // No data
      expect(renderTemplate(template, variables)).toBe('Hello, !')
    })
  })
  describe('renderMessagesWithVariabels', () => {
    it('renders a simple message with one variable', () => {
      const messages = [{ role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}!' }]
      const variables = { name: 'Alice' }
      expect(renderMessagesWithVariabels(messages, variables)).toEqual([{ role: PromptMessageRoleEnum.USER, content: 'Hello, Alice!' }])
    })

    it('renders a simple message with no variables', () => {
      const messages = [{ role: PromptMessageRoleEnum.USER, content: 'Hello!' }]
      const variables = {}
      expect(renderMessagesWithVariabels(messages, variables)).toEqual([{ role: PromptMessageRoleEnum.USER, content: 'Hello!' }])
    })
  })
  describe('renderPromptWithVariables', () => {
    it('renders a prompt with one variable', () => {
      const prompt: PromptConfiguration = {
        promptId: 'hi',
        promptParameters: {
          modelName: 'davinci',
          maxTokens: 100,
          temperature: 0.5,
          topP: 1.0,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0,
          responseFormat: 'json',
          seed: 0
        },
        promptTools: [],
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}!' }]
      }
      const variables = { name: 'Alice' }

      expect(renderPromptWithVariables(prompt, variables)).toEqual({
        ...prompt,
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello, Alice!' }]
      })
    })

    it('renders a prompt with no variables', () => {
      const prompt: PromptConfiguration = {
        promptId: 'hi',
        promptParameters: {
          modelName: 'davinci',
          maxTokens: 100,
          temperature: 0.5,
          topP: 1.0,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0,
          responseFormat: 'json',
          seed: 0
        },
        promptTools: [],
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello!' }]
      }
      const variables = {}

      expect(renderPromptWithVariables(prompt, variables)).toEqual({
        ...prompt,
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello!' }]
      })
    })
  })
  describe('validatePromptVariables', () => {
    it('returns true if all configured variables are in passed in varibles', () => {
      const prompt: PromptConfiguration = {
        promptId: 'hi',
        promptParameters: {
          modelName: 'davinci',
          maxTokens: 100,
          temperature: 0.5,
          topP: 1.0,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0,
          responseFormat: 'json',
          seed: 0
        },
        promptTools: [],
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}!' }]
      }
      const variables = { name: 'Alice' }

      expect(validatePromptVariables(prompt, variables)).toEqual(true)
    })

    it('returns false if configured variables are missing in passed in varibles', () => {
      const prompt: PromptConfiguration = {
        promptId: 'hi',
        promptParameters: {
          modelName: 'davinci',
          maxTokens: 100,
          temperature: 0.5,
          topP: 1.0,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0,
          responseFormat: 'json',
          seed: 0
        },
        promptTools: [],
        promptMessages: [{ role: PromptMessageRoleEnum.USER, content: 'Hello, {{name}}!' }]
      }
      const variables = {}

      expect(validatePromptVariables(prompt, variables)).toEqual(false)
    })
  })
})
