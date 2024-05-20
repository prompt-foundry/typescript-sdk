import { getPrompt } from '../getPrompt'

describe('getPrompt', () => {
  test('hello world test', () => {
    expect(getPrompt({ promptId: 'HELLO' })).toMatchSnapshot()
  })
})
