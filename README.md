# Prompt Foundry TypeScript SDK

Prompt Foundry is a comprehensive tool for prompt engineering, management, and evaluation. It is designed to simplify the development and integration process for developers working on TypeScript, JavaScript, and NodeJS AI applications utilizing large language models (LLMs).

This SDK provides convenient access to the Prompt Foundry REST API from server-side TypeScript or JavaScript applications.

## Deploy Prompt

To use this SDK, you need a Prompt Foundry account. Sign up at [promptfoundry.ai](https://promptfoundry.ai). Follow the getting started guide in our [documentation](https://docs.promptfoundry.ai/quickstart/getting-started) to get set up.

![Playground](/playground.gif)

## Installation

[![NPM version](https://img.shields.io/npm/v/@prompt-foundry/typescript-sdk.svg)](https://npmjs.org/package/@prompt-foundry/typescript-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@prompt-foundry/typescript-sdk)

```sh
npm install @prompt-foundry/typescript-sdk
```

## Integration

The full Prompt Foundry documentation can be found at [docs.promptfoundry.ai](https://docs.promptfoundry.ai/libraries/node).

### Option 1 - Completion Proxy

Initiates a completion request to the configured LLM provider using specified parameters and provided variables. This endpoint abstracts the integration with different model providers, enabling seamless switching between models while maintaining a consistent data model for your application.

```js
import PromptFoundry from '@prompt-foundry/typescript-sdk';

// Initialize Prompt Foundry SDK with your API key
const promptFoundry = new PromptFoundry({
  apiKey: process.env['PROMPT_FOUNDRY_API_KEY'],
});

async function main() {
  // Retrieve model parameters for the prompt
  const completionCreateResponse = await client.completion.create('637ae1aa8f4aa6fad144ccbd', {
    // Optionally append additional messages to the converstation thread on top of your configured prompt messages
    appendMessages: [
      {
        role: 'user',
        content: [
          {
            type: 'TEXT',
            text: 'What is the weather in Seattle, WA?',
          },
        ],
      },
    ],
    // Supports prompt template variables
    variables: {},
  });
  // completion response
  console.log(completionCreateResponse.message);
}

main().catch(console.error);
```

### Option 2 - Direct Provider Integration

Fetches the configured model parameters and messages rendered with the provided variables mapped to the set LLM provider. This endpoint abstracts the need to handle mapping between different providers, while still allowing direct calls to the providers.

#### OpenAI Integration

Install the OpenAI SDK

```sh
npm install openai
```

Import the OpenAI and Prompt Foundry SDKs

```js
import PromptFoundry from '@prompt-foundry/typescript-sdk';
import { Configuration, OpenAIApi } from 'openai';

// Initialize Prompt Foundry SDK with your API key
const promptFoundry = new PromptFoundry({
  apiKey: process.env['PROMPT_FOUNDRY_API_KEY'],
});

// Initialize OpenAI SDK with your API key
const configuration = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
});
const openai = new OpenAIApi(configuration);

async function main() {
  // Retrieve model parameters for the prompt
  const modelParameters = await promptFoundry.prompts.getParameters('1212121', {
    variables: { hello: 'world' },
    appendMessages: [
      {
        role: 'user',
        content: [
          {
            type: 'TEXT',
            text: 'What is the weather in Seattle, WA?',
          },
        ],
      },
    ],
  });

  // check if provider is Open AI
  if (modelParameters.provider === 'openai') {
    // Use the retrieved parameters to create a chat completion request
    const modelResponse = await openai.chat.completions.create(modelParameters.parameters);

    // Print the response from OpenAI
    console.log(modelResponse.data);
  }
}

main().catch(console.error);
```

#### Anthropic Integration

Install the Anthropic SDK

```sh
npm install @anthropic-ai/sdk
```

Import the Anthropic and Prompt Foundry SDKs

```js
import PromptFoundry from '@prompt-foundry/typescript-sdk';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Prompt Foundry SDK with your API key
const promptFoundry = new PromptFoundry({
  apiKey: process.env['PROMPT_FOUNDRY_API_KEY'],
});

// Initialize Anthropic SDK with your API key
const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

async function main() {
  // Retrieve model parameters for the prompt
  const modelParameters = await promptFoundry.prompts.getParameters('1212121', {
    variables: { hello: 'world' },
    appendMessages: [
      {
        role: 'user',
        content: [
          {
            type: 'TEXT',
            text: 'What is the weather in Seattle, WA?',
          },
        ],
      },
    ],
  });

  // check if provider is Open AI
  if (modelParameters.provider === 'anthropic') {
    // Use the retrieved parameters to create a chat completion request
    const message = await anthropic.messages.create(modelParameters.parameters);

    // Print the response from Anthropic
    console.log(message.content);
  }
}

main().catch(console.error);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import PromptFoundry from '@prompt-foundry/typescript-sdk';

const client = new PromptFoundry({
  apiKey: process.env['PROMPT_FOUNDRY_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const completionCreateResponse: PromptFoundry.CompletionCreateResponse = await client.completion.create(
    '1212121',
  );
}

main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
async function main() {
  const completionCreateResponse = await client.completion.create('1212121').catch(async (err) => {
    if (err instanceof PromptFoundry.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
}

main();
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new PromptFoundry({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.completion.create('1212121', {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new PromptFoundry({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.completion.create('1212121', {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

<!-- prettier-ignore -->
```ts
const client = new PromptFoundry();

const response = await client.completion.create('1212121').asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: completionCreateResponse, response: raw } = await client.completion
  .create('1212121')
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(completionCreateResponse.message);
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.foo.create({
  foo: 'my_param',
  bar: 12,
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "PromptFoundry"`:

```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import '@prompt-foundry/typescript-sdk/shims/web';
import PromptFoundry from '@prompt-foundry/typescript-sdk';
```

To do the inverse, add `import "@prompt-foundry/typescript-sdk/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` ([more details](https://github.com/prompt-foundry/typescript-sdk/tree/main/src/_shims#readme)).

### Logging and middleware

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import PromptFoundry from '@prompt-foundry/typescript-sdk';

const client = new PromptFoundry({
  fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('About to make a request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

### Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const client = new PromptFoundry({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await client.completion.create('1212121', {
  httpAgent: new http.Agent({ keepAlive: false }),
});
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/prompt-foundry/typescript-sdk/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import PromptFoundry from "npm:@prompt-foundry/typescript-sdk"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

> [!WARNING]
> Web browser runtimes aren't supported. The SDK will throw an error if used in a browser environment.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
