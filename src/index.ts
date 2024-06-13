// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from './core';
import * as Errors from './error';
import { type Agent } from './_shims/index';
import * as Uploads from './uploads';
import * as API from '@prompt-foundry/typescript-sdk/resources/index';

export interface ClientOptions {
  /**
   * Defaults to process.env['PROMPT_FOUNDRY_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['PROMPT_FOUNDRY_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/** API Client for interfacing with the Prompt Foundry API. */
export class PromptFoundry extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Prompt Foundry API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['PROMPT_FOUNDRY_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['PROMPT_FOUNDRY_BASE_URL'] ?? https://api.promptfoundry.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('PROMPT_FOUNDRY_BASE_URL'),
    apiKey = Core.readEnv('PROMPT_FOUNDRY_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.PromptFoundryError(
        "The PROMPT_FOUNDRY_API_KEY environment variable is missing or empty; either provide it, or instantiate the PromptFoundry client with an apiKey option, like new PromptFoundry({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.promptfoundry.ai`,
    };

    if (Core.isRunningInBrowser()) {
      throw new Errors.PromptFoundryError(
        "It looks like you're running in a browser-like environment, which is disabled to protect your secret API credentials from attackers. If you have a strong business need for client-side use of this API, please open a GitHub issue with your use-case and security mitigations.",
      );
    }

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this._options = options;

    this.apiKey = apiKey;
  }

  prompts: API.Prompts = new API.Prompts(this);
  tools: API.Tools = new API.Tools(this);
  evaluationAssertions: API.EvaluationAssertions = new API.EvaluationAssertions(this);
  evaluations: API.Evaluations = new API.Evaluations(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'X-API-KEY': this.apiKey };
  }

  static PromptFoundry = this;

  static PromptFoundryError = Errors.PromptFoundryError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

export const {
  PromptFoundryError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace PromptFoundry {
  export import RequestOptions = Core.RequestOptions;

  export import Prompts = API.Prompts;
  export import ModelParameters = API.ModelParameters;
  export import PromptConfiguration = API.PromptConfiguration;
  export import PromptListResponse = API.PromptListResponse;
  export import PromptDeleteResponse = API.PromptDeleteResponse;
  export import PromptCreateParams = API.PromptCreateParams;
  export import PromptUpdateParams = API.PromptUpdateParams;
  export import PromptGetParametersParams = API.PromptGetParametersParams;

  export import Tools = API.Tools;
  export import Tool = API.Tool;
  export import ToolListResponse = API.ToolListResponse;
  export import ToolDeleteResponse = API.ToolDeleteResponse;
  export import ToolCreateParams = API.ToolCreateParams;
  export import ToolUpdateParams = API.ToolUpdateParams;

  export import EvaluationAssertions = API.EvaluationAssertions;
  export import EvaluationAssertion = API.EvaluationAssertion;
  export import EvaluationAssertionListResponse = API.EvaluationAssertionListResponse;
  export import EvaluationAssertionDeleteResponse = API.EvaluationAssertionDeleteResponse;
  export import EvaluationAssertionCreateParams = API.EvaluationAssertionCreateParams;
  export import EvaluationAssertionUpdateParams = API.EvaluationAssertionUpdateParams;
  export import EvaluationAssertionListParams = API.EvaluationAssertionListParams;

  export import Evaluations = API.Evaluations;
  export import Evaluation = API.Evaluation;
  export import EvaluationListResponse = API.EvaluationListResponse;
  export import EvaluationDeleteResponse = API.EvaluationDeleteResponse;
  export import EvaluationCreateParams = API.EvaluationCreateParams;
  export import EvaluationUpdateParams = API.EvaluationUpdateParams;
}

export default PromptFoundry;
