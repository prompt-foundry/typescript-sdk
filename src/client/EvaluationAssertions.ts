import { api } from '../openapi/client'
import { EvaluationAssertion, EvaluationAssertionBody } from '../types'

export default class EvaluationAssertions {
  private client: typeof api

  private apiKey: string

  constructor({ client, apiKey }: { apiKey: string; client: typeof api }) {
    this.client = client
    this.apiKey = apiKey
  }

  public create(data: EvaluationAssertionBody): Promise<EvaluationAssertion> {
    return this.client.createEvaluationAssertion(data, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public update({ id, data }: { id: string; data: EvaluationAssertionBody }): Promise<EvaluationAssertion> {
    return this.client.updateEvaluationAssertion(data, {
      params: { evaluationAssertionId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public async delete({ id }: { id: string }): Promise<null> {
    await this.client.deleteEvaluationAssertion(undefined, {
      params: { evaluationAssertionId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })

    return null
  }

  public get({ id }: { id: string }): Promise<EvaluationAssertion> {
    return this.client.getEvaluationAssertion({
      params: { evaluationAssertionId: id },
      headers: {
        'X-API-KEY': this.apiKey
      }
    })
  }

  public list({ evaluationId }: { evaluationId?: string }): Promise<EvaluationAssertion[]> {
    return this.client.getEvaluationAssertions({
      headers: {
        'X-API-KEY': this.apiKey
      },
      queries: {
        evaluationId
      }
    })
  }
}
