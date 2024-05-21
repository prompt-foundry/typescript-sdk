import APIClient from '../ApiClient'
import Client from '../Client'

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
    test('hello world test', async () => {
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

      const prompt = await client.getPrompt({ promptId: 'HELLO' })

      expect(prompt).toEqual(value)
    })
  })
})
