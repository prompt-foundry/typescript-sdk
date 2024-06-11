import { BASE_URL } from '../constants'
import { api, createApiClient } from '../openapi/client'

import EvaluationAssertions from './EvaluationAssertions'
import Evaluations from './Evaluations'
import Prompts from './Prompts'
import Tools from './Tools'

export default class PromptFoundry {
  private client: typeof api

  prompts: Prompts

  tools: Tools

  evaluations: Evaluations

  evaluationAssertions: EvaluationAssertions

  constructor({ apiKey, baseUrl = BASE_URL }: { apiKey: string; baseUrl?: string }) {
    // @ts-expect-error - protect against missing apiKey for js consumers
    if (apiKey === '' || apiKey === undefined || apiKey === null || apiKey === 0) {
      throw new Error('Prompt Foundry API Key is required!')
    }

    this.client = createApiClient(baseUrl)
    this.prompts = new Prompts({ client: this.client, apiKey })
    this.tools = new Tools({ client: this.client, apiKey })
    this.evaluations = new Evaluations({ client: this.client, apiKey })
    this.evaluationAssertions = new EvaluationAssertions({ client: this.client, apiKey })
  }
}
