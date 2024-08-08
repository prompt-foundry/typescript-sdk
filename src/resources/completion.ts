// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as CompletionAPI from './completion';

export class Completion extends APIResource {
  /**
   * Initiates a completion request to the configured LLM provider using specified
   * parameters and provided variables. This endpoint abstracts the integration with
   * different model providers, enabling seamless switching between models while
   * maintaining a consistent data model for your application.
   */
  create(
    id: string,
    body?: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse>;
  create(id: string, options?: Core.RequestOptions): Core.APIPromise<CompletionCreateResponse>;
  create(
    id: string,
    body: CompletionCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionCreateResponse> {
    if (isRequestOptions(body)) {
      return this.create(id, {}, body);
    }
    return this._client.post(`/sdk/v1/prompts/${id}/completion`, { body, ...options });
  }
}

export interface CompletionCreateResponse {
  /**
   * The completion message generated by the model.
   */
  message: CompletionCreateResponse.Message;

  name: string;

  /**
   * The LLM model provider.
   */
  provider: 'ANTHROPIC' | 'OPENAI';

  stats: CompletionCreateResponse.Stats;
}

export namespace CompletionCreateResponse {
  /**
   * The completion message generated by the model.
   */
  export interface Message {
    content: Array<
      | Message.TextContentBlock
      | Message.ImageBase64ContentBlock
      | Message.ToolCallContentBlock
      | Message.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace Message {
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

  export interface Stats {
    /**
     * The cost of generating the completion.
     */
    cost: number;

    /**
     * The number of tokens in the input prompt.
     */
    inputTokenCount: number;

    /**
     * The time in milliseconds it took to generate the completion.
     */
    latency: number;

    /**
     * The number of tokens in the output completion.
     */
    outputTokenCount: number;
  }
}

export interface CompletionCreateParams {
  /**
   * Appended the the end of the configured prompt messages before running the
   * prompt.
   */
  appendMessages?: Array<CompletionCreateParams.AppendMessage>;

  /**
   * Replaces the configured prompt messages when running the prompt.
   */
  overrideMessages?: Array<CompletionCreateParams.OverrideMessage>;

  /**
   * A unique identifier representing your end-user, which can help monitor and
   * detect abuse.
   */
  user?: string;

  /**
   * The template variables added to the prompt when executing the prompt.
   */
  variables?: Record<string, string | null>;
}

export namespace CompletionCreateParams {
  export interface AppendMessage {
    content: Array<
      | AppendMessage.TextContentBlock
      | AppendMessage.ImageBase64ContentBlock
      | AppendMessage.ToolCallContentBlock
      | AppendMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace AppendMessage {
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

  export interface OverrideMessage {
    content: Array<
      | OverrideMessage.TextContentBlock
      | OverrideMessage.ImageBase64ContentBlock
      | OverrideMessage.ToolCallContentBlock
      | OverrideMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace OverrideMessage {
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

export namespace Completion {
  export import CompletionCreateResponse = CompletionAPI.CompletionCreateResponse;
  export import CompletionCreateParams = CompletionAPI.CompletionCreateParams;
}
