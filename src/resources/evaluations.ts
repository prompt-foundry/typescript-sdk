// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '@@@prompt-foundry/typescript-sdk/core';
import { APIPromise } from '@@@prompt-foundry/typescript-sdk/core';
import { APIResource } from '@@@prompt-foundry/typescript-sdk/resource';
import { isRequestOptions } from '@@@prompt-foundry/typescript-sdk/core';
import { type Response } from '@@@prompt-foundry/typescript-sdk/_shims/index';
import * as EvaluationsAPI from '@@@prompt-foundry/typescript-sdk/resources/evaluations';

export class Evaluations extends APIResource {
  /**
   * Create a new evaluation.
   */
  create(body: EvaluationCreateParams, options?: Core.RequestOptions): Core.APIPromise<Evaluation> {
    return this._client.post('/sdk/v1/evaluations', { body, ...options });
  }

  /**
   * Update a evaluation by ID.
   */
  update(id: string, body: EvaluationUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Evaluation> {
    return this._client.put(`/sdk/v1/evaluations/${id}`, { body, ...options });
  }

  /**
   * Retrieve all evaluations
   */
  list(options?: Core.RequestOptions): Core.APIPromise<EvaluationListResponse> {
    return this._client.get('/sdk/v1/evaluations', options);
  }

  /**
   * Delete a evaluation by ID.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationDeleteResponse> {
    return this._client.delete(`/sdk/v1/evaluations/${id}`, options);
  }

  /**
   * Retrieve a evaluation by ID
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<Evaluation> {
    return this._client.get(`/sdk/v1/evaluations/${id}`, options);
  }
}

export interface Evaluation {
  id: string;

  /**
   * The messages to append to the completion messages when running the evaluation.
   */
  appendedMessages: Array<Evaluation.AppendedMessage>;

  promptId: string;

  /**
   * The variables to in the prompt when evaluating the prompt.
   */
  variables: Record<string, unknown>;
}

export namespace Evaluation {
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface AppendedMessage {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<AppendedMessage.ToolCall> | null;
  }

  export namespace AppendedMessage {
    export interface ToolCall {
      function: ToolCall.Function;

      /**
       * TOOL_CALL_1
       */
      toolCallId: string;

      /**
       * The type of the tool. Currently, only `function` is supported.
       */
      type: 'function';
    }

    export namespace ToolCall {
      export interface Function {
        /**
         * The arguments to call the function with, as generated by the model in JSON
         * format. Note that the model does not always generate valid JSON, and may
         * hallucinate parameters not defined by your function schema. Validate the
         * arguments in your code before calling your function.
         */
        arguments: string;

        /**
         * The name of the function to call.
         */
        name: string;
      }
    }
  }
}

export type EvaluationListResponse = Array<Evaluation>

export interface EvaluationDeleteResponse {
  success?: boolean;
}

export interface EvaluationCreateParams {
  /**
   * The messages to append to the completion messages when running the evaluation.
   */
  appendedMessages: Array<EvaluationCreateParams.AppendedMessage>;

  promptId: string;

  /**
   * The variables to in the prompt when evaluating the prompt.
   */
  variables: Record<string, unknown>;
}

export namespace EvaluationCreateParams {
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface AppendedMessage {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<AppendedMessage.ToolCall> | null;
  }

  export namespace AppendedMessage {
    export interface ToolCall {
      function: ToolCall.Function;

      /**
       * TOOL_CALL_1
       */
      toolCallId: string;

      /**
       * The type of the tool. Currently, only `function` is supported.
       */
      type: 'function';
    }

    export namespace ToolCall {
      export interface Function {
        /**
         * The arguments to call the function with, as generated by the model in JSON
         * format. Note that the model does not always generate valid JSON, and may
         * hallucinate parameters not defined by your function schema. Validate the
         * arguments in your code before calling your function.
         */
        arguments: string;

        /**
         * The name of the function to call.
         */
        name: string;
      }
    }
  }
}

export interface EvaluationUpdateParams {
  /**
   * The messages to append to the completion messages when running the evaluation.
   */
  appendedMessages: Array<EvaluationUpdateParams.AppendedMessage>;

  promptId: string;

  /**
   * The variables to in the prompt when evaluating the prompt.
   */
  variables: Record<string, unknown>;
}

export namespace EvaluationUpdateParams {
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface AppendedMessage {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<AppendedMessage.ToolCall> | null;
  }

  export namespace AppendedMessage {
    export interface ToolCall {
      function: ToolCall.Function;

      /**
       * TOOL_CALL_1
       */
      toolCallId: string;

      /**
       * The type of the tool. Currently, only `function` is supported.
       */
      type: 'function';
    }

    export namespace ToolCall {
      export interface Function {
        /**
         * The arguments to call the function with, as generated by the model in JSON
         * format. Note that the model does not always generate valid JSON, and may
         * hallucinate parameters not defined by your function schema. Validate the
         * arguments in your code before calling your function.
         */
        arguments: string;

        /**
         * The name of the function to call.
         */
        name: string;
      }
    }
  }
}

export namespace Evaluations {
  export import Evaluation = EvaluationsAPI.Evaluation;
  export import EvaluationListResponse = EvaluationsAPI.EvaluationListResponse;
  export import EvaluationDeleteResponse = EvaluationsAPI.EvaluationDeleteResponse;
  export import EvaluationCreateParams = EvaluationsAPI.EvaluationCreateParams;
  export import EvaluationUpdateParams = EvaluationsAPI.EvaluationUpdateParams;
}
