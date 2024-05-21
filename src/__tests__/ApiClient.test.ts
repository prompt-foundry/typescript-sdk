// apiClient.test.ts
import axios from 'axios'

import APIClient from '../ApiClient'

// Mock the entire Axios module
jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('APIClient', () => {
  const baseURL = 'https://api.example.com'
  const apiToken = 'test-token'

  it('should create axios instance with given base URL and Authorization header', () => {
    // eslint-disable-next-line no-new
    new APIClient({ baseURL, apiToken })

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiToken}`
      }
    })
  })
})
