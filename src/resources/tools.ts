// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ToolsAPI from './tools';

export class Tools extends APIResource {
  /**
   * Data needed to create a new tool
   */
  create(body: ToolCreateParams, options?: Core.RequestOptions): Core.APIPromise<Tool> {
    return this._client.post('/sdk/v1/tools', { body, ...options });
  }

  /**
   * Update the configuration of an existing tool by providing its ID and new data.
   */
  update(id: string, body: ToolUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Tool> {
    return this._client.put(`/sdk/v1/tools/${id}`, { body, ...options });
  }

  /**
   * Retrieve all tools
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ToolListResponse> {
    return this._client.get('/sdk/v1/tools', options);
  }

  /**
   * Delete a tool by ID.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<ToolDeleteResponse> {
    return this._client.delete(`/sdk/v1/tools/${id}`, options);
  }

  /**
   * Fetch the details of a specific tool using its ID.
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<Tool> {
    return this._client.get(`/sdk/v1/tools/${id}`, options);
  }
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

export type ToolListResponse = Array<Tool>;

export interface ToolDeleteResponse {
  success?: boolean;
}

export interface ToolCreateParams {
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

export interface ToolUpdateParams {
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

export namespace Tools {
  export import Tool = ToolsAPI.Tool;
  export import ToolListResponse = ToolsAPI.ToolListResponse;
  export import ToolDeleteResponse = ToolsAPI.ToolDeleteResponse;
  export import ToolCreateParams = ToolsAPI.ToolCreateParams;
  export import ToolUpdateParams = ToolsAPI.ToolUpdateParams;
}
