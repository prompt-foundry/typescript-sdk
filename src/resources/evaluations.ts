// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as EvaluationsAPI from './evaluations';

export class Evaluations extends APIResource {
  /**
   * Create a new evaluation.
   */
  create(body: EvaluationCreateParams, options?: Core.RequestOptions): Core.APIPromise<Evaluation> {
    return this._client.post('/sdk/v1/evaluations', { body, ...options });
  }

  /**
   * Update an evaluation by ID.
   */
  update(
    id: string,
    body: EvaluationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Evaluation> {
    return this._client.put(`/sdk/v1/evaluations/${id}`, { body, ...options });
  }

  /**
   * Retrieve all evaluations
   */
  list(options?: Core.RequestOptions): Core.APIPromise<EvaluationListResponse> {
    return this._client.get('/sdk/v1/evaluations', options);
  }

  /**
   * Delete an evaluation by ID.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<EvaluationDeleteResponse> {
    return this._client.delete(`/sdk/v1/evaluations/${id}`, options);
  }

  /**
   * Retrieve an evaluation by ID
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
   * The template variables added to the prompt when executing the prompt.
   */
  variables: Record<string, string | null>;

  /**
   * What percentage of assertions must pass for the evaluation to pass.
   */
  threshold?: number;

  /**
   * How heavily to weigh the evaluation within the prompt.
   */
  weight?: number;
}

export namespace Evaluation {
  export interface AppendedMessage {
    content: Array<
      | AppendedMessage.TextContentBlock
      | AppendedMessage.ImageBase64ContentBlock
      | AppendedMessage.ToolCallContentBlock
      | AppendedMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace AppendedMessage {
    export interface TextContentBlock {
      text: string;

      type: 'TEXT';
    }

    export interface ImageBase64ContentBlock {
      imageBase64: string;

      mediaType: string;

      type: 'IMAGE_BASE64';
    }

    export interface ToolCallContentBlock {
      toolCall: ToolCallContentBlock.ToolCall;

      type: 'TOOL_CALL';
    }

    export namespace ToolCallContentBlock {
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

    export interface ToolResultContentBlock {
      result: string;

      toolCallId: string;

      type: 'TOOL_RESULT';
    }
  }
}

export type EvaluationListResponse = Array<Evaluation>;

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
   * The template variables added to the prompt when executing the prompt.
   */
  variables: Record<string, string | null>;

  /**
   * What percentage of assertions must pass for the evaluation to pass.
   */
  threshold?: number;

  /**
   * How heavily to weigh the evaluation within the prompt.
   */
  weight?: number;
}

export namespace EvaluationCreateParams {
  export interface AppendedMessage {
    content: Array<
      | AppendedMessage.TextContentBlock
      | AppendedMessage.ImageBase64ContentBlock
      | AppendedMessage.ToolCallContentBlock
      | AppendedMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace AppendedMessage {
    export interface TextContentBlock {
      text: string;

      type: 'TEXT';
    }

    export interface ImageBase64ContentBlock {
      imageBase64: string;

      mediaType: string;

      type: 'IMAGE_BASE64';
    }

    export interface ToolCallContentBlock {
      toolCall: ToolCallContentBlock.ToolCall;

      type: 'TOOL_CALL';
    }

    export namespace ToolCallContentBlock {
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

    export interface ToolResultContentBlock {
      result: string;

      toolCallId: string;

      type: 'TOOL_RESULT';
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
   * The template variables added to the prompt when executing the prompt.
   */
  variables: Record<string, string | null>;

  /**
   * What percentage of assertions must pass for the evaluation to pass.
   */
  threshold?: number;

  /**
   * How heavily to weigh the evaluation within the prompt.
   */
  weight?: number;
}

export namespace EvaluationUpdateParams {
  export interface AppendedMessage {
    content: Array<
      | AppendedMessage.TextContentBlock
      | AppendedMessage.ImageBase64ContentBlock
      | AppendedMessage.ToolCallContentBlock
      | AppendedMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace AppendedMessage {
    export interface TextContentBlock {
      text: string;

      type: 'TEXT';
    }

    export interface ImageBase64ContentBlock {
      imageBase64: string;

      mediaType: string;

      type: 'IMAGE_BASE64';
    }

    export interface ToolCallContentBlock {
      toolCall: ToolCallContentBlock.ToolCall;

      type: 'TOOL_CALL';
    }

    export namespace ToolCallContentBlock {
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

    export interface ToolResultContentBlock {
      result: string;

      toolCallId: string;

      type: 'TOOL_RESULT';
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
