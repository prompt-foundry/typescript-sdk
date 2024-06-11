import { api } from '../openapi/client'
import { Evaluation, EvaluationBody } from '../types'

export default class Evaluations {
  private client: typeof api

  private apiKey: string

  constructor({ client, apiKey }: { apiKey: string; client: typeof api }) {
    this.client = client
    this.apiKey = apiKey
  }

  public create(data: EvaluationBody): Promise<Evaluation> {
    return this.client.createEvaluation(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public update({ id, data }: { id: string; data: EvaluationBody }): Promise<Evaluation> {
    return this.client.updateEvaluation(data, {
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async delete({ id }: { id: string }): Promise<null> {
    await this.client.deleteEvaluation(undefined, {
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public get({ id }: { id: string }): Promise<Evaluation> {
    return this.client.getEvaluation({
      params: { evaluationId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public list(): Promise<Evaluation[]> {
    return this.client.getEvaluations({
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }
}
