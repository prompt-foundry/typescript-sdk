import APIClient from '../ApiClient'
import Client from '../Client'
import { PromptConfiguration, PromptMessageRoleEnum } from '../types'

describe('client', () => {
  describe('init client', () => {
    test('inits', () => {
      expect(() => new Client({ apiKey: 'HELLO_WORLD_API_KEY' })).not.toThrow()
    })

    test('throws if no api key - empty string', () => {
      expect(() => new Client({ apiKey: '' })).toThrow()
    })

    test('throws if no api key - no args', () => {
      // @ts-expect-error - testing for no args
      expect(() => new Client()).toThrow()
    })
  })
  describe('getPrompt', () => {
    it('returns prompt', async () => {
      const client = new Client({ apiKey: '123' })

      const value = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: {
            type: 'text'
          },
          temperature: 0.7,
          topP: 1
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: 'user'
          },
          {
            content: 'Hi there!',
            role: 'assistant'
          }
        ]
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      const prompt = await client.getPrompt({ promptId: 'HELLO', variables: {} })

      expect(prompt).toEqual(value)
    })

    it('should replace variables', async () => {
      const client = new Client({ apiKey: '123' })

      const value: PromptConfiguration = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: 'TEXT',
          temperature: 0.7,
          topP: 1,
          seed: null,
          maxTokens: null,
          toolChoice: 'auto'
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: PromptMessageRoleEnum.USER,
            toolCalls: null,
            toolCallId: null
          },
          {
            content: 'Hi there {{name}}!',
            role: PromptMessageRoleEnum.ASSISTANT,
            toolCalls: null,
            toolCallId: null
          }
        ],
        promptTools: []
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      const prompt = await client.getPrompt({ promptId: 'HELLO', variables: { name: 'bob' } })

      expect(prompt.promptMessages[1].content).toEqual('Hi there bob!')
    })

    it('should throw error if missing variables', async () => {
      const client = new Client({ apiKey: '123' })

      const value: PromptConfiguration = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: 'TEXT',
          temperature: 0.7,
          topP: 1,
          seed: null,
          maxTokens: null,
          toolChoice: 'auto'
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: PromptMessageRoleEnum.USER,
            toolCalls: null,
            toolCallId: null
          },
          {
            content: 'Hi there {{name}}!',
            role: PromptMessageRoleEnum.ASSISTANT,
            toolCalls: null,
            toolCallId: null
          }
        ],
        promptTools: []
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      await expect(() => client.getPrompt({ promptId: 'HELLO', variables: {} })).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('getOpenAiPrompt', () => {
    it('returnsmapped prompt', async () => {
      const client = new Client({ apiKey: '123' })

      const value: PromptConfiguration = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: 'TEXT',
          temperature: 0.7,
          topP: 1,
          seed: null,
          maxTokens: null,
          toolChoice: 'auto'
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: PromptMessageRoleEnum.USER,
            toolCalls: null,
            toolCallId: null
          },
          {
            content: 'Hi there!',
            role: PromptMessageRoleEnum.ASSISTANT,
            toolCalls: null,
            toolCallId: null
          }
        ],
        promptTools: []
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      const prompt = await client.getOpenAiPrompt({ promptId: 'HELLO', variables: {} })

      expect(prompt).toMatchSnapshot()
    })

    it('should replace variables', async () => {
      const client = new Client({ apiKey: '123' })

      const value: PromptConfiguration = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: 'TEXT',
          temperature: 0.7,
          topP: 1,
          seed: null,
          maxTokens: null,
          toolChoice: 'auto'
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: PromptMessageRoleEnum.USER,
            toolCalls: null,
            toolCallId: null
          },
          {
            content: 'Hi there {{name}}!',
            role: PromptMessageRoleEnum.ASSISTANT,
            toolCalls: null,
            toolCallId: null
          }
        ],
        promptTools: []
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      const prompt = await client.getOpenAiPrompt({ promptId: 'HELLO', variables: { name: 'bob' } })

      expect(prompt.messages[1].content).toEqual('Hi there bob!')
    })

    it('should throw error if missing variables', async () => {
      const client = new Client({ apiKey: '123' })

      const value: PromptConfiguration = {
        promptId: 'HELLO',
        promptParameters: {
          frequencyPenalty: 0,
          modelName: 'gpt-3.5-turbo',
          presencePenalty: 0,
          responseFormat: 'TEXT',
          temperature: 0.7,
          topP: 1,
          seed: null,
          maxTokens: null,
          toolChoice: 'auto'
        },
        promptMessages: [
          {
            content: 'Hello, world!',
            role: PromptMessageRoleEnum.USER,
            toolCalls: null,
            toolCallId: null
          },
          {
            content: 'Hi there {{name}}!',
            role: PromptMessageRoleEnum.ASSISTANT,
            toolCalls: null,
            toolCallId: null
          }
        ],
        promptTools: []
      }

      const apiClient: APIClient = {
        // @ts-expect-error - mocking the client's client property
        axiosInstance: {}, // Mocked as an empty object or with specific mock functions if needed
        get: jest.fn().mockResolvedValue(value)
      }

      // @ts-expect-error - mocking the client's client property
      client.client = apiClient

      await expect(() => client.getOpenAiPrompt({ promptId: 'HELLO', variables: {} })).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
