// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class APIClient {
  private axiosInstance: AxiosInstance

  constructor({ apiToken, baseURL }: { baseURL: string; apiToken: string }) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiToken}`
      }
    })
  }

  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>['data']> {
    return this.axiosInstance.get<T>(endpoint, config).then((response) => response.data)
  }
}

export default APIClient
