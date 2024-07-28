// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as EvaluationAssertionsAPI from './evaluation-assertions';

export class EvaluationAssertions extends APIResource {
  /**
   * Creates a new evaluation assertion
   */
  create(
    body: EvaluationAssertionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationAssertion> {
    return this._client.post('/sdk/v1/evaluation-assertions', { body, ...options });
  }

  /**
   * Update an existing evaluation assertion by providing its ID and new data.
   */
  update(
    id: string,
    body: EvaluationAssertionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationAssertion> {
    return this._client.put(`/sdk/v1/evaluation-assertions/${id}`, { body, ...options });
  }

  /**
   * Retrieve all evaluation assertions optionally filtered by evaluation ID
   */
  list(
    query?: EvaluationAssertionListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationAssertionListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<EvaluationAssertionListResponse>;
  list(
    query: EvaluationAssertionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluationAssertionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/sdk/v1/evaluation-assertions', { query, ...options });
  }

  /**
   * Delete an evaluation assertion by providing its ID.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationAssertionDeleteResponse> {
    return this._client.delete(`/sdk/v1/evaluation-assertions/${id}`, options);
  }

  /**
   * Retrieve the details of an evaluation assertion using its ID.
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationAssertion> {
    return this._client.get(`/sdk/v1/evaluation-assertions/${id}`, options);
  }
}

export type EvaluationAssertion =
  | EvaluationAssertion.EvaluationAssertionExactMatch
  | EvaluationAssertion.EvaluationAssertionContainsAll
  | EvaluationAssertion.EvaluationAssertionContainsAny
  | EvaluationAssertion.EvaluationAssertionStartsWith
  | EvaluationAssertion.EvaluationAssertionCost
  | EvaluationAssertion.EvaluationAssertionLatency
  | EvaluationAssertion.EvaluationAssertionToolCalled
  | EvaluationAssertion.EvaluationAssertionToolCalledWith;

export namespace EvaluationAssertion {
  export interface EvaluationAssertionExactMatch {
    id: string;

    evaluationId: string;

    /**
     * The value to match.
     */
    targetValue: string;

    type: 'EXACT_MATCH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAll {
    id: string;

    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ALL';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAny {
    id: string;

    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ANY';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionStartsWith {
    id: string;

    evaluationId: string;

    /**
     * The value that the response should start with.
     */
    targetValue: string;

    type: 'STARTS_WITH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionCost {
    id: string;

    evaluationId: string;

    /**
     * The cost threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'COST';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionLatency {
    id: string;

    evaluationId: string;

    /**
     * The latency threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'LATENCY';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalled {
    id: string;

    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalledWith {
    id: string;

    /**
     * The argument name to be matched.
     */
    argKeyName: string;

    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED_WITH';

    /**
     * Whether to ignore case when comparing argument names.
     */
    ignoreCase?: boolean;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }
}

export type EvaluationAssertionListResponse = Array<EvaluationAssertion>;

export interface EvaluationAssertionDeleteResponse {
  success?: boolean;
}

export type EvaluationAssertionCreateParams =
  | EvaluationAssertionCreateParams.EvaluationAssertionExactMatchBody
  | EvaluationAssertionCreateParams.EvaluationAssertionContainsAllBody
  | EvaluationAssertionCreateParams.EvaluationAssertionContainsAnyBody
  | EvaluationAssertionCreateParams.EvaluationAssertionStartsWithBody
  | EvaluationAssertionCreateParams.EvaluationAssertionCostBody
  | EvaluationAssertionCreateParams.EvaluationAssertionLatencyBody
  | EvaluationAssertionCreateParams.EvaluationAssertionToolCalledBody
  | EvaluationAssertionCreateParams.EvaluationAssertionToolCalledWithBody;

export namespace EvaluationAssertionCreateParams {
  export interface EvaluationAssertionExactMatchBody {
    evaluationId: string;

    /**
     * The value to match.
     */
    targetValue: string;

    type: 'EXACT_MATCH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAllBody {
    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ALL';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAnyBody {
    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ANY';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionStartsWithBody {
    evaluationId: string;

    /**
     * The value that the response should start with.
     */
    targetValue: string;

    type: 'STARTS_WITH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionCostBody {
    evaluationId: string;

    /**
     * The cost threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'COST';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionLatencyBody {
    evaluationId: string;

    /**
     * The latency threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'LATENCY';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalledBody {
    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalledWithBody {
    /**
     * The argument name to be matched.
     */
    argKeyName: string;

    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED_WITH';

    /**
     * Whether to ignore case when comparing argument names.
     */
    ignoreCase?: boolean;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }
}

export type EvaluationAssertionUpdateParams =
  | EvaluationAssertionUpdateParams.EvaluationAssertionExactMatchBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionContainsAllBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionContainsAnyBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionStartsWithBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionCostBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionLatencyBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionToolCalledBody
  | EvaluationAssertionUpdateParams.EvaluationAssertionToolCalledWithBody;

export namespace EvaluationAssertionUpdateParams {
  export interface EvaluationAssertionExactMatchBody {
    evaluationId: string;

    /**
     * The value to match.
     */
    targetValue: string;

    type: 'EXACT_MATCH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAllBody {
    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ALL';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionContainsAnyBody {
    evaluationId: string;

    /**
     * List of values any of which may be present.
     */
    targetValues: Array<string>;

    type: 'CONTAINS_ANY';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionStartsWithBody {
    evaluationId: string;

    /**
     * The value that the response should start with.
     */
    targetValue: string;

    type: 'STARTS_WITH';

    /**
     * Whether to ignore case when comparing strings.
     */
    ignoreCase?: boolean;

    /**
     * A JSON path to use when matching a JSON response.
     */
    jsonPath?: string | null;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionCostBody {
    evaluationId: string;

    /**
     * The cost threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'COST';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionLatencyBody {
    evaluationId: string;

    /**
     * The latency threshold to be evaluated against.
     */
    targetThreshold: number;

    type: 'LATENCY';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalledBody {
    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED';

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }

  export interface EvaluationAssertionToolCalledWithBody {
    /**
     * The argument name to be matched.
     */
    argKeyName: string;

    evaluationId: string;

    /**
     * The name of the tool that should have been called.
     */
    toolName: string;

    type: 'TOOL_CALLED_WITH';

    /**
     * Whether to ignore case when comparing argument names.
     */
    ignoreCase?: boolean;

    /**
     * Whether to negate the assertion. "true" means the assertion must NOT be true.
     */
    negate?: boolean;

    /**
     * How heavily to weigh the assertion within the evaluation.
     */
    weight?: number;
  }
}

export interface EvaluationAssertionListParams {
  /**
   * Optional ID to filter the assertions by specific evaluation ID
   */
  evaluationId?: string;
}

export namespace EvaluationAssertions {
  export import EvaluationAssertion = EvaluationAssertionsAPI.EvaluationAssertion;
  export import EvaluationAssertionListResponse = EvaluationAssertionsAPI.EvaluationAssertionListResponse;
  export import EvaluationAssertionDeleteResponse = EvaluationAssertionsAPI.EvaluationAssertionDeleteResponse;
  export import EvaluationAssertionCreateParams = EvaluationAssertionsAPI.EvaluationAssertionCreateParams;
  export import EvaluationAssertionUpdateParams = EvaluationAssertionsAPI.EvaluationAssertionUpdateParams;
  export import EvaluationAssertionListParams = EvaluationAssertionsAPI.EvaluationAssertionListParams;
}
