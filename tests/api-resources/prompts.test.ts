// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PromptFoundry from '@prompt-foundry/typescript-sdk';
import { Response } from 'node-fetch';

const promptFoundry = new PromptFoundry({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource prompts', () => {
  test('create: only required params', async () => {
    const responsePromise = promptFoundry.prompts.create({
      messages: [
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
      ],
      name: 'name',
      parameters: {
        modelProvider: 'ANTHROPIC',
        modelName: 'modelName',
        responseFormat: 'JSON',
        temperature: 0,
        topP: 0,
        topK: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        maxTokens: 0,
        seed: 0,
        toolChoice: 'toolChoice',
        stream: true,
        parallelToolCalls: true,
      },
      tools: [{ toolId: 'toolId' }, { toolId: 'toolId' }, { toolId: 'toolId' }],
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
    const response = await promptFoundry.prompts.create({
      messages: [
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
      ],
      name: 'name',
      parameters: {
        modelProvider: 'ANTHROPIC',
        modelName: 'modelName',
        responseFormat: 'JSON',
        temperature: 0,
        topP: 0,
        topK: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        maxTokens: 0,
        seed: 0,
        toolChoice: 'toolChoice',
        stream: true,
        parallelToolCalls: true,
      },
      tools: [{ toolId: 'toolId' }, { toolId: 'toolId' }, { toolId: 'toolId' }],
    });
  });

  test('update: only required params', async () => {
    const responsePromise = promptFoundry.prompts.update('1212121', {
      messages: [
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
      ],
      name: 'name',
      parameters: {
        modelProvider: 'ANTHROPIC',
        modelName: 'modelName',
        responseFormat: 'JSON',
        temperature: 0,
        topP: 0,
        topK: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        maxTokens: 0,
        seed: 0,
        toolChoice: 'toolChoice',
        stream: true,
        parallelToolCalls: true,
      },
      tools: [{ toolId: 'toolId' }, { toolId: 'toolId' }, { toolId: 'toolId' }],
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
    const response = await promptFoundry.prompts.update('1212121', {
      messages: [
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
        {
          content: 'content',
          role: 'assistant',
          toolCallId: 'toolCallId',
          toolCalls: [
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
            {
              toolCallId: 'toolCallId',
              type: 'function',
              function: { arguments: 'arguments', name: 'name' },
            },
          ],
        },
      ],
      name: 'name',
      parameters: {
        modelProvider: 'ANTHROPIC',
        modelName: 'modelName',
        responseFormat: 'JSON',
        temperature: 0,
        topP: 0,
        topK: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        maxTokens: 0,
        seed: 0,
        toolChoice: 'toolChoice',
        stream: true,
        parallelToolCalls: true,
      },
      tools: [{ toolId: 'toolId' }, { toolId: 'toolId' }, { toolId: 'toolId' }],
    });
  });

  test('list', async () => {
    const responsePromise = promptFoundry.prompts.list();
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
    await expect(promptFoundry.prompts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      PromptFoundry.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = promptFoundry.prompts.delete('1212121');
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
      promptFoundry.prompts.delete('1212121', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PromptFoundry.NotFoundError);
  });

  test('get', async () => {
    const responsePromise = promptFoundry.prompts.get('1212121');
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
    await expect(promptFoundry.prompts.get('1212121', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      PromptFoundry.NotFoundError,
    );
  });

  test('getParameters', async () => {
    const responsePromise = promptFoundry.prompts.getParameters('1212121');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getParameters: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      promptFoundry.prompts.getParameters('1212121', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PromptFoundry.NotFoundError);
  });

  test('getParameters: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      promptFoundry.prompts.getParameters(
        '1212121',
        {
          appendMessages: [
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
          ],
          overrideMessages: [
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
            {
              content: 'content',
              role: 'assistant',
              toolCallId: 'toolCallId',
              toolCalls: [
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
                {
                  toolCallId: 'toolCallId',
                  type: 'function',
                  function: { arguments: 'arguments', name: 'name' },
                },
              ],
            },
          ],
          user: 'user',
          variables: { foo: 'string' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PromptFoundry.NotFoundError);
  });
});
