// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as PromptsAPI from './prompts';

export class Prompts extends APIResource {
  /**
   * Creates and deploys a new prompt
   */
  create(body: PromptCreateParams, options?: Core.RequestOptions): Core.APIPromise<PromptConfiguration> {
    return this._client.post('/sdk/v1/prompts', { body, ...options });
  }

  /**
   * Update the configuration of an existing prompt and deploys it.
   */
  update(
    id: string,
    body: PromptUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PromptConfiguration> {
    return this._client.put(`/sdk/v1/prompts/${id}`, { body, ...options });
  }

  /**
   * Retrieve all prompts
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PromptListResponse> {
    return this._client.get('/sdk/v1/prompts', options);
  }

  /**
   * Delete a prompt configuration by ID. This will remove the prompt from the system
   * and all associated data including evaluations.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<PromptDeleteResponse> {
    return this._client.delete(`/sdk/v1/prompts/${id}`, options);
  }

  /**
   * Get the configuration of an existing prompt.
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<PromptConfiguration> {
    return this._client.get(`/sdk/v1/prompts/${id}`, options);
  }

  /**
   * Fetches the configured model parameters and messages rendered with the provided
   * variables mapped to the set LLM provider. This endpoint abstracts the need to
   * handle mapping between different providers, while still allowing direct calls to
   * the providers.
   */
  getParameters(
    id: string,
    body?: PromptGetParametersParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelParameters>;
  getParameters(id: string, options?: Core.RequestOptions): Core.APIPromise<ModelParameters>;
  getParameters(
    id: string,
    body: PromptGetParametersParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ModelParameters> {
    if (isRequestOptions(body)) {
      return this.getParameters(id, {}, body);
    }
    return this._client.post(`/sdk/v1/prompts/${id}`, { body, ...options });
  }
}

export type ModelParameters =
  | ModelParameters.AnthropicModelParameters
  | ModelParameters.OpenAIModelParameters;

export namespace ModelParameters {
  export interface AnthropicModelParameters {
    name: string;

    parameters: AnthropicModelParameters.Parameters;

    provider: 'anthropic';
  }

  export namespace AnthropicModelParameters {
    export interface Parameters {
      max_tokens: number;

      messages: Array<Parameters.Message>;

      model:
        | (string & {})
        | 'claude-3-5-sonnet-20240620'
        | 'claude-3-opus-20240229'
        | 'claude-3-sonnet-20240229'
        | 'claude-3-haiku-20240307';

      metadata?: Parameters.Metadata;

      stop_sequences?: Array<string>;

      stream?: boolean;

      system?: string;

      temperature?: number;

      tool_choice?:
        | Parameters.MessageCreateParamsToolChoiceAuto
        | Parameters.MessageCreateParamsToolChoiceAny
        | Parameters.MessageCreateParamsToolChoiceTool;

      tools?: Array<Parameters.Tool>;

      top_k?: number;

      top_p?: number;
    }

    export namespace Parameters {
      export interface Message {
        content:
          | string
          | Array<
              | Message.TextBlockParam
              | Message.ImageBlockParam
              | Message.ToolUseBlockParam
              | Message.ToolResultBlockParam
            >;

        role: 'user' | 'assistant';
      }

      export namespace Message {
        export interface TextBlockParam {
          text: string;

          type: 'text';
        }

        export interface ImageBlockParam {
          source: ImageBlockParam.Source;

          type: 'image';
        }

        export namespace ImageBlockParam {
          export interface Source {
            data: string;

            media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

            type: 'base64';
          }
        }

        export interface ToolUseBlockParam {
          id: string;

          input: Record<string, string>;

          name: string;

          type: 'tool_use';
        }

        export interface ToolResultBlockParam {
          tool_use_id: string;

          type: 'tool_result';

          content?:
            | string
            | Array<ToolResultBlockParam.TextBlockParam | ToolResultBlockParam.ImageBlockParam>;

          is_error?: boolean;
        }

        export namespace ToolResultBlockParam {
          export interface TextBlockParam {
            text: string;

            type: 'text';
          }

          export interface ImageBlockParam {
            source: ImageBlockParam.Source;

            type: 'image';
          }

          export namespace ImageBlockParam {
            export interface Source {
              data: string;

              media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

              type: 'base64';
            }
          }
        }
      }

      export interface Metadata {
        user_id?: string | null;
      }

      export interface MessageCreateParamsToolChoiceAuto {
        type: 'auto';
      }

      export interface MessageCreateParamsToolChoiceAny {
        type: 'any';
      }

      export interface MessageCreateParamsToolChoiceTool {
        name: string;

        type: 'tool';
      }

      export interface Tool {
        input_schema: Tool.InputSchema;

        name: string;

        description?: string;
      }

      export namespace Tool {
        export interface InputSchema {
          type: 'object';

          properties?: unknown | null;
          [k: string]: unknown;
        }
      }
    }
  }

  export interface OpenAIModelParameters {
    name: string;

    parameters: OpenAIModelParameters.Parameters;

    provider: 'openai';
  }

  export namespace OpenAIModelParameters {
    export interface Parameters {
      messages: Array<
        | Parameters.OpenAIChatCompletionRequestSystemMessage
        | Parameters.OpenAIChatCompletionRequestUserMessage
        | Parameters.OpenAIChatCompletionRequestAssistantMessage
        | Parameters.OpenAIChatCompletionRequestToolMessage
        | Parameters.OpenAIChatCompletionRequestFunctionMessage
      >;

      model: string;

      frequency_penalty?: number | null;

      logit_bias?: Record<string, number> | null;

      logprobs?: boolean | null;

      max_tokens?: number | null;

      n?: number | null;

      parallel_tool_calls?: boolean;

      presence_penalty?: number | null;

      response_format?: Parameters.ResponseFormat;

      seed?: number | null;

      stop?: string | Array<string>;

      stream?: boolean | null;

      stream_options?: Parameters.StreamOptions | null;

      temperature?: number | null;

      tool_choice?: 'none' | 'auto' | 'required' | Parameters.OpenAIChatCompletionNamedToolChoice;

      tools?: Array<Parameters.Tool>;

      top_logprobs?: number | null;

      top_p?: number | null;

      user?: string;
    }

    export namespace Parameters {
      export interface OpenAIChatCompletionRequestSystemMessage {
        content: string;

        role: 'system';

        name?: string;
      }

      export interface OpenAIChatCompletionRequestUserMessage {
        content:
          | string
          | Array<
              | OpenAIChatCompletionRequestUserMessage.OpenAIChatCompletionRequestMessageContentPartText
              | OpenAIChatCompletionRequestUserMessage.OpenAIChatCompletionRequestMessageContentPartImage
            >;

        role: 'user';

        name?: string;
      }

      export namespace OpenAIChatCompletionRequestUserMessage {
        export interface OpenAIChatCompletionRequestMessageContentPartText {
          text: string;

          type: 'text';
        }

        export interface OpenAIChatCompletionRequestMessageContentPartImage {
          image_url: OpenAIChatCompletionRequestMessageContentPartImage.ImageURL;

          type: 'image_url';
        }

        export namespace OpenAIChatCompletionRequestMessageContentPartImage {
          export interface ImageURL {
            url: string;

            detail?: 'auto' | 'low' | 'high';
          }
        }
      }

      export interface OpenAIChatCompletionRequestAssistantMessage {
        role: 'assistant';

        content?: string | null;

        function_call?: OpenAIChatCompletionRequestAssistantMessage.FunctionCall | null;

        name?: string;

        tool_calls?: Array<OpenAIChatCompletionRequestAssistantMessage.ToolCall>;
      }

      export namespace OpenAIChatCompletionRequestAssistantMessage {
        export interface FunctionCall {
          arguments: string;

          name: string;
        }

        export interface ToolCall {
          id: string;

          function: ToolCall.Function;

          type: 'function';
        }

        export namespace ToolCall {
          export interface Function {
            arguments: string;

            name: string;
          }
        }
      }

      export interface OpenAIChatCompletionRequestToolMessage {
        content: string;

        role: 'tool';

        tool_call_id: string;
      }

      export interface OpenAIChatCompletionRequestFunctionMessage {
        content: string | null;

        name: string;

        role: 'function';
      }

      export interface ResponseFormat {
        type?: 'text' | 'json_object';
      }

      export interface StreamOptions {
        include_usage: boolean;
      }

      export interface OpenAIChatCompletionNamedToolChoice {
        function: OpenAIChatCompletionNamedToolChoice.Function;

        type: 'function';
      }

      export namespace OpenAIChatCompletionNamedToolChoice {
        export interface Function {
          name: string;
        }
      }

      export interface Tool {
        function: Tool.Function;

        type: 'function';
      }

      export namespace Tool {
        export interface Function {
          name: string;

          description?: string;

          parameters?: Record<string, unknown>;
        }
      }
    }
  }
}

export interface PromptConfiguration {
  /**
   * Example: "PROMPT_1"
   */
  id: string;

  /**
   * The configured messages WITHOUT variables replaced.
   */
  messages: Array<PromptConfiguration.Message>;

  /**
   * Example: "Check the weather"
   */
  name: string;

  parameters: PromptConfiguration.Parameters;

  tools: Array<PromptConfiguration.Tool>;
}

export namespace PromptConfiguration {
  export interface Message {
    content: Array<
      | Message.TextContentBlockSchema
      | Message.ImageBase64ContentBlock
      | Message.ToolCallContentBlock
      | Message.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace Message {
    export interface TextContentBlockSchema {
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

  export interface Parameters {
    /**
     * Example: 0
     */
    frequencyPenalty: number;

    /**
     * Example: 100
     */
    maxTokens: number | null;

    /**
     * Example: "gpt-3.5-turbo"
     */
    modelName: string;

    /**
     * The provider of the provided model.
     */
    modelProvider: 'ANTHROPIC' | 'OPENAI';

    parallelToolCalls: boolean;

    /**
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'JSON' | 'TEXT';

    /**
     * Example: 97946543
     */
    seed: number | null;

    stream: boolean;

    /**
     * Example: 1
     */
    temperature: number;

    toolChoice: string | null;

    /**
     * Example: 50
     */
    topK: number | null;

    /**
     * Example: 1
     */
    topP: number;
  }

  export interface Tool {
    /**
     * The initial messages to be included with your call to the LLM API.
     */
    id: string;

    /**
     * A description of what the tool does, used by the model to choose when and how to
     * call the tool.
     */
    description: string;

    /**
     * The name of the tool to be called. Must be a-z, A-Z, 0-9, or contain underscores
     * and dashes, with a maximum length of 64.
     */
    name: string;

    /**
     * The parameters the functions accepts, described as a JSON Schema object. This
     * schema is designed to match the TypeScript Record<string, unknown>, allowing for
     * any properties with values of any type.
     */
    parameters: Record<string, unknown>;
  }
}

export type PromptListResponse = Array<PromptConfiguration>;

export interface PromptDeleteResponse {
  success?: boolean;
}

export interface PromptCreateParams {
  messages: Array<PromptCreateParams.Message>;

  name: string;

  parameters: PromptCreateParams.Parameters;

  tools: Array<PromptCreateParams.Tool>;
}

export namespace PromptCreateParams {
  export interface Message {
    content: Array<
      | Message.TextContentBlockSchema
      | Message.ImageBase64ContentBlock
      | Message.ToolCallContentBlock
      | Message.ToolResultContentBlock
    >;

    promptMessageId: string;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace Message {
    export interface TextContentBlockSchema {
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

  export interface Parameters {
    /**
     * Example: 0
     */
    frequencyPenalty: number;

    /**
     * Example: 100
     */
    maxTokens: number | null;

    /**
     * Example: "gpt-3.5-turbo"
     */
    modelName: string;

    /**
     * The provider of the provided model.
     */
    modelProvider: 'ANTHROPIC' | 'OPENAI';

    parallelToolCalls: boolean;

    /**
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'JSON' | 'TEXT';

    /**
     * Example: 97946543
     */
    seed: number | null;

    stream: boolean;

    /**
     * Example: 1
     */
    temperature: number;

    toolChoice: string | null;

    /**
     * Example: 50
     */
    topK: number | null;

    /**
     * Example: 1
     */
    topP: number;
  }

  export interface Tool {
    toolId: string;
  }
}

export interface PromptUpdateParams {
  messages: Array<PromptUpdateParams.Message>;

  name: string;

  parameters: PromptUpdateParams.Parameters;

  tools: Array<PromptUpdateParams.Tool>;
}

export namespace PromptUpdateParams {
  export interface Message {
    content: Array<
      | Message.TextContentBlockSchema
      | Message.ImageBase64ContentBlock
      | Message.ToolCallContentBlock
      | Message.ToolResultContentBlock
    >;

    promptMessageId: string;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace Message {
    export interface TextContentBlockSchema {
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

  export interface Parameters {
    /**
     * Example: 0
     */
    frequencyPenalty: number;

    /**
     * Example: 100
     */
    maxTokens: number | null;

    /**
     * Example: "gpt-3.5-turbo"
     */
    modelName: string;

    /**
     * The provider of the provided model.
     */
    modelProvider: 'ANTHROPIC' | 'OPENAI';

    parallelToolCalls: boolean;

    /**
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'JSON' | 'TEXT';

    /**
     * Example: 97946543
     */
    seed: number | null;

    stream: boolean;

    /**
     * Example: 1
     */
    temperature: number;

    toolChoice: string | null;

    /**
     * Example: 50
     */
    topK: number | null;

    /**
     * Example: 1
     */
    topP: number;
  }

  export interface Tool {
    toolId: string;
  }
}

export interface PromptGetParametersParams {
  /**
   * Appended the the end of the configured prompt messages before running the
   * prompt.
   */
  appendMessages?: Array<PromptGetParametersParams.AppendMessage>;

  /**
   * Replaces the configured prompt messages when running the prompt.
   */
  overrideMessages?: Array<PromptGetParametersParams.OverrideMessage>;

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

export namespace PromptGetParametersParams {
  export interface AppendMessage {
    content: Array<
      | AppendMessage.TextContentBlockSchema
      | AppendMessage.ImageBase64ContentBlock
      | AppendMessage.ToolCallContentBlock
      | AppendMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace AppendMessage {
    export interface TextContentBlockSchema {
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
      | OverrideMessage.TextContentBlockSchema
      | OverrideMessage.ImageBase64ContentBlock
      | OverrideMessage.ToolCallContentBlock
      | OverrideMessage.ToolResultContentBlock
    >;

    role: 'assistant' | 'system' | 'tool' | 'user';
  }

  export namespace OverrideMessage {
    export interface TextContentBlockSchema {
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

export namespace Prompts {
  export import ModelParameters = PromptsAPI.ModelParameters;
  export import PromptConfiguration = PromptsAPI.PromptConfiguration;
  export import PromptListResponse = PromptsAPI.PromptListResponse;
  export import PromptDeleteResponse = PromptsAPI.PromptDeleteResponse;
  export import PromptCreateParams = PromptsAPI.PromptCreateParams;
  export import PromptUpdateParams = PromptsAPI.PromptUpdateParams;
  export import PromptGetParametersParams = PromptsAPI.PromptGetParametersParams;
}
