// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '@@@prompt-foundry/typescript-sdk/core';
import { APIPromise } from '@@@prompt-foundry/typescript-sdk/core';
import { APIResource } from '@@@prompt-foundry/typescript-sdk/resource';
import { isRequestOptions } from '@@@prompt-foundry/typescript-sdk/core';
import { type Response } from '@@@prompt-foundry/typescript-sdk/_shims/index';
import * as PromptsAPI from '@@@prompt-foundry/typescript-sdk/resources/prompts';

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
  update(id: string, body: PromptUpdateParams, options?: Core.RequestOptions): Core.APIPromise<PromptConfiguration> {
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
   * Fetches the model configuration parameters for a specified prompt, including
   * penalty settings, response format, and the model messages rendered with the
   * given variables mapped to the set LLM provider.
   */
  getParameters(id: string, body?: PromptGetParametersParams, options?: Core.RequestOptions): Core.APIPromise<ModelParameters>
  getParameters(id: string, options?: Core.RequestOptions): Core.APIPromise<ModelParameters>
  getParameters(id: string, body: PromptGetParametersParams | Core.RequestOptions = {}, options?: Core.RequestOptions): Core.APIPromise<ModelParameters> {
    if (isRequestOptions(body)) {
      return this.getParameters(id, {}, body);
    }
    return this._client.post(`/sdk/v1/prompts/${id}`, { body, ...options });
  }
}

export interface ModelParameters {
  parameters: ModelParameters.Parameters;

  provider: 'openai';
}

export namespace ModelParameters {
  export interface Parameters {
    messages: Array<Parameters.OpenAIChatCompletionRequestSystemMessage | Parameters.OpenAIChatCompletionRequestUserMessage | Parameters.OpenAIChatCompletionRequestAssistantMessage | Parameters.OpenAIChatCompletionRequestToolMessage | Parameters.OpenAIChatCompletionRequestFunctionMessage>;

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
      content: string | Array<OpenAIChatCompletionRequestUserMessage.OpenAIChatCompletionRequestMessageContentPartText | OpenAIChatCompletionRequestUserMessage.OpenAIChatCompletionRequestMessageContentPartImage>;

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

        parameters?: unknown;
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
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface Message {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<Message.ToolCall> | null;
  }

  export namespace Message {
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
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'TEXT' | 'JSON';

    /**
     * Example: 97946543
     */
    seed: number | null;

    /**
     * Example: 1
     */
    temperature: number;

    /**
     * Example: "checkWeather"
     */
    toolChoice: string | null;

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

export type PromptListResponse = Array<PromptConfiguration>

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
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface Message {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<Message.ToolCall> | null;
  }

  export namespace Message {
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
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'TEXT' | 'JSON';

    /**
     * Example: 97946543
     */
    seed: number | null;

    /**
     * Example: 1
     */
    temperature: number;

    /**
     * Example: "checkWeather"
     */
    toolChoice: string | null;

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
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface Message {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<Message.ToolCall> | null;
  }

  export namespace Message {
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
     * Example: 0
     */
    presencePenalty: number;

    /**
     * Example: PromptResponseFormat.TEXT
     */
    responseFormat: 'TEXT' | 'JSON';

    /**
     * Example: 97946543
     */
    seed: number | null;

    /**
     * Example: 1
     */
    temperature: number;

    /**
     * Example: "checkWeather"
     */
    toolChoice: string | null;

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
   * The template variables added to the prompt when running the prompt.
   */
  variables?: Record<string, unknown>;
}

export namespace PromptGetParametersParams {
  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface AppendMessage {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<AppendMessage.ToolCall> | null;
  }

  export namespace AppendMessage {
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

  /**
   * The initial messages to be included with your call to the LLM API.
   */
  export interface OverrideMessage {
    /**
     * Example: "Hello, {{city}}!"
     */
    content: string | null;

    role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

    toolCallId: string | null;

    toolCalls: Array<OverrideMessage.ToolCall> | null;
  }

  export namespace OverrideMessage {
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

export namespace Prompts {
  export import ModelParameters = PromptsAPI.ModelParameters;
  export import PromptConfiguration = PromptsAPI.PromptConfiguration;
  export import PromptListResponse = PromptsAPI.PromptListResponse;
  export import PromptDeleteResponse = PromptsAPI.PromptDeleteResponse;
  export import PromptCreateParams = PromptsAPI.PromptCreateParams;
  export import PromptUpdateParams = PromptsAPI.PromptUpdateParams;
  export import PromptGetParametersParams = PromptsAPI.PromptGetParametersParams;
}
