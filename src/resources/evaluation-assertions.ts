// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '@prompt-foundry/typescript-sdk/resource';
import { isRequestOptions } from '@prompt-foundry/typescript-sdk/core';
import * as Core from '@prompt-foundry/typescript-sdk/core';
import * as EvaluationAssertionsAPI from '@prompt-foundry/typescript-sdk/resources/evaluation-assertions';

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

export interface EvaluationAssertion {
  id: string;

  evaluationId: string;

  /**
   * A JSON path to use when matching the response. Only required when type is
   * `JSON_EXACT_MATCH` or `JSON_CONTAINS`.
   */
  jsonPath: string | null;

  targetValue: string;

  /**
   * The name of the tool to match. Only required when type is `TOOL_CALLED` or
   * `TOOL_CALLED_WITH`.
   */
  toolName: string | null;

  /**
   * The type of evaluation matcher to use.
   */
  type:
    | 'EXACT_MATCH'
    | 'CONTAINS'
    | 'JSON_EXACT_MATCH'
    | 'JSON_CONTAINS'
    | 'TOOL_CALLED'
    | 'TOOL_CALLED_WITH';
}

export type EvaluationAssertionListResponse = Array<EvaluationAssertion>;

export interface EvaluationAssertionDeleteResponse {
  success?: boolean;
}

export interface EvaluationAssertionCreateParams {
  evaluationId: string;

  /**
   * A JSON path to use when matching the response. Only required when type is
   * `JSON_EXACT_MATCH` or `JSON_CONTAINS`.
   */
  jsonPath: string | null;

  targetValue: string;

  /**
   * The name of the tool to match. Only required when type is `TOOL_CALLED` or
   * `TOOL_CALLED_WITH`.
   */
  toolName: string | null;

  /**
   * The type of evaluation matcher to use.
   */
  type:
    | 'EXACT_MATCH'
    | 'CONTAINS'
    | 'JSON_EXACT_MATCH'
    | 'JSON_CONTAINS'
    | 'TOOL_CALLED'
    | 'TOOL_CALLED_WITH';
}

export interface EvaluationAssertionUpdateParams {
  evaluationId: string;

  /**
   * A JSON path to use when matching the response. Only required when type is
   * `JSON_EXACT_MATCH` or `JSON_CONTAINS`.
   */
  jsonPath: string | null;

  targetValue: string;

  /**
   * The name of the tool to match. Only required when type is `TOOL_CALLED` or
   * `TOOL_CALLED_WITH`.
   */
  toolName: string | null;

  /**
   * The type of evaluation matcher to use.
   */
  type:
    | 'EXACT_MATCH'
    | 'CONTAINS'
    | 'JSON_EXACT_MATCH'
    | 'JSON_CONTAINS'
    | 'TOOL_CALLED'
    | 'TOOL_CALLED_WITH';
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
