// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PromptFoundry from '@prompt-foundry/typescript-sdk';
import { Response } from 'node-fetch';

const promptFoundry = new PromptFoundry({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource evaluations', () => {
  test('create: only required params', async () => {
    const responsePromise = promptFoundry.evaluations.create({
      appendedMessages: [
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
      ],
      promptId: 'promptId',
      variables: { foo: 'string' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await promptFoundry.evaluations.create({
      appendedMessages: [
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
      ],
      promptId: 'promptId',
      variables: { foo: 'string' },
    });
  });

  test('update: only required params', async () => {
    const responsePromise = promptFoundry.evaluations.update('1212121', {
      appendedMessages: [
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
      ],
      promptId: 'promptId',
      variables: { foo: 'string' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await promptFoundry.evaluations.update('1212121', {
      appendedMessages: [
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
        {
          content: [
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
            { type: 'TEXT', text: 'text' },
          ],
          role: 'assistant',
        },
      ],
      promptId: 'promptId',
      variables: { foo: 'string' },
    });
  });

  test('list', async () => {
    const responsePromise = promptFoundry.evaluations.list();
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
    await expect(promptFoundry.evaluations.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      PromptFoundry.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = promptFoundry.evaluations.delete('1212121');
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
    await expect(
      promptFoundry.evaluations.delete('1212121', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PromptFoundry.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = promptFoundry.evaluations.get('1212121');
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
    await expect(
      promptFoundry.evaluations.get('1212121', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PromptFoundry.NotFoundError);
  });
});
