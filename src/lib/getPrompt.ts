import { Prompt, PromptMessageRole } from '../types/Prompt'

export const getPrompt = ({ promptId }: { promptId: string }): Promise<Prompt> => {
  return Promise.resolve({
    promptId,
    promptMessages: [
      {
        content: 'You are a helpful assistant.',
        role: PromptMessageRole.SYSTEM
      }
    ],
    promptParameters: {
      modelName: 'gpt-4o',
      temperature: 1,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      responseFormat: {
        type: 'text'
      }
    }
  })
}
