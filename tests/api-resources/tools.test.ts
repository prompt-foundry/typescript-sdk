// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PromptFoundry, { toFile } from '@@@prompt-foundry/typescript-sdk';
import { Response } from 'node-fetch';

const promptFoundry = new PromptFoundry({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource tools', () => {
  test('create: only required params', async () => {
    const responsePromise = promptFoundry.tools.create({ description: 'string', name: 'string', parameters: { foo: {} } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await promptFoundry.tools.create({ description: 'string', name: 'string', parameters: { foo: {} } });
  });

  test('update: only required params', async () => {
    const responsePromise = promptFoundry.tools.update('1212121', { description: 'string', name: 'string', parameters: { foo: {} } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await promptFoundry.tools.update('1212121', { description: 'string', name: 'string', parameters: { foo: {} } });
  });

  test('list', async () => {
    const responsePromise = promptFoundry.tools.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(promptFoundry.tools.list({ path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(PromptFoundry.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = promptFoundry.tools.delete('1212121');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(promptFoundry.tools.delete('1212121', { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(PromptFoundry.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = promptFoundry.tools.get('1212121');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(promptFoundry.tools.get('1212121', { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(PromptFoundry.NotFoundError);
  });
});
