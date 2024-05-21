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
                 * text
                 */
                responseFormat: "text" | "json";
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
            };
            /**
             * Variables to be used in the prompt messages.
             * example:
             * [
             *   "name",
             *   "city"
             * ]
             */
            promptVariables: string[];
            promptMessages: {
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
            }[];
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
