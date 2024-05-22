import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Error {
            /**
             * example:
             * Prompt ID is required.
             */
            error?: string;
        }
        export interface PromptConfiguration {
            /**
             * example:
             * PROMPT_1
             */
            promptId: string;
            promptParameters: {
                /**
                 * example:
                 * 0
                 */
                frequencyPenalty: number;
                /**
                 * example:
                 * gpt-3.5-turbo
                 */
                modelName: string;
                /**
                 * example:
                 * 0
                 */
                presencePenalty: number;
                /**
                 * example:
                 * TEXT
                 */
                responseFormat: "TEXT" | "JSON";
                /**
                 * example:
                 * 1
                 */
                temperature: number;
                /**
                 * example:
                 * 1
                 */
                topP: number;
                /**
                 * example:
                 * 100
                 */
                maxTokens: number | null;
                /**
                 * example:
                 * 97946543
                 */
                seed: number | null;
                /**
                 * example:
                 * checkWeather
                 */
                toolChoice?: string | null;
            };
            promptMessages: /* The initial messages to be included with your call to the LLM API. */ PromptMessage[];
            promptTools: Tool[];
        }
        /**
         * The initial messages to be included with your call to the LLM API.
         */
        export interface PromptMessage {
            /**
             * example:
             * Hello, {{city}}!
             */
            content: string;
            /**
             * example:
             * user
             */
            role: "USER" | "ASSISTANT" | "SYSTEM" | "TOOL";
        }
        export interface Tool {
            /**
             * example:
             * TOOL_1
             */
            toolId?: string;
            /**
             * The name of the tool to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
             */
            name: string; // ^[a-zA-Z0-9_-]{1,64}$
            /**
             * A description of what the tool does, used by the model to choose when and how to call the tool.
             */
            description: string;
            parameters: /* The parameters the functions accepts, described as a JSON Schema object. This schema is designed to match the TypeScript Record<string, unknown>, allowing for any properties with values of any type. */ ToolParameters;
        }
        /**
         * The parameters the functions accepts, described as a JSON Schema object. This schema is designed to match the TypeScript Record<string, unknown>, allowing for any properties with values of any type.
         */
        export interface ToolParameters {
            [name: string]: any;
        }
    }
}
declare namespace Paths {
    namespace SdkV1Prompts$PromptId {
        namespace Get {
            export interface HeaderParameters {
                "X-API-KEY": Parameters.XAPIKEY;
            }
            namespace Parameters {
                export type PromptId = string;
                export type XAPIKEY = string;
            }
            export interface PathParameters {
                promptId: Parameters.PromptId;
            }
            namespace Responses {
                export type $200 = Components.Schemas.PromptConfiguration;
                export type $400 = Components.Schemas.Error;
                export type $401 = Components.Schemas.Error;
                export type $404 = Components.Schemas.Error;
                export type $500 = Components.Schemas.Error;
            }
        }
    }
}

export interface OperationMethods {
}

export interface PathsDictionary {
  ['/sdk/v1/prompts/{promptId}']: {
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
