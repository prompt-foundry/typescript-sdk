import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

const PromptConfiguration = z
  .object({
    id: z.string(),
    name: z.string(),
    parameters: z
      .object({
        modelName: z.string(),
        responseFormat: z.enum(['TEXT', 'JSON']),
        temperature: z.number(),
        topP: z.number(),
        frequencyPenalty: z.number(),
        presencePenalty: z.number(),
        maxTokens: z.number().nullable(),
        seed: z.number().nullable(),
        toolChoice: z.string().nullable()
      })
      .passthrough(),
    messages: z.array(
      z
        .object({
          content: z.string().nullable(),
          role: z.enum(['USER', 'ASSISTANT', 'SYSTEM', 'TOOL']),
          toolCallId: z.string().nullable(),
          toolCalls: z
            .array(
              z
                .object({
                  toolCallId: z.string(),
                  type: z.literal('function'),
                  function: z.object({ arguments: z.string(), name: z.string() }).passthrough()
                })
                .passthrough()
            )
            .nullable()
        })
        .passthrough()
    ),
    tools: z.array(
      z
        .object({
          id: z.string(),
          name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/),
          description: z.string(),
          parameters: z.record(z.unknown().nullable())
        })
        .passthrough()
    )
  })
  .passthrough()
const ErrorResponse = z.object({ error: z.string() }).passthrough()
const PromptBody = z
  .object({
    name: z.string(),
    tools: z.array(z.object({ toolId: z.string() }).passthrough()),
    messages: z.array(
      z
        .object({
          content: z.string().nullable(),
          role: z.enum(['USER', 'ASSISTANT', 'SYSTEM', 'TOOL']),
          toolCallId: z.string().nullable(),
          toolCalls: z
            .array(
              z
                .object({
                  toolCallId: z.string(),
                  type: z.literal('function'),
                  function: z.object({ arguments: z.string(), name: z.string() }).passthrough()
                })
                .passthrough()
            )
            .nullable()
        })
        .passthrough()
    ),
    parameters: z
      .object({
        modelName: z.string(),
        responseFormat: z.enum(['TEXT', 'JSON']),
        temperature: z.number(),
        topP: z.number(),
        frequencyPenalty: z.number(),
        presencePenalty: z.number(),
        maxTokens: z.number().nullable(),
        seed: z.number().nullable(),
        toolChoice: z.string().nullable()
      })
      .passthrough()
  })
  .passthrough()
const ToolBody = z
  .object({ name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/), description: z.string(), parameters: z.record(z.unknown().nullable()) })
  .passthrough()
const Tool = z
  .object({ id: z.string(), name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/), description: z.string(), parameters: z.record(z.unknown().nullable()) })
  .passthrough()
const EvaluationAssertionBody = z
  .object({
    evaluationId: z.string(),
    target: z.string(),
    matcher: z.object({ type: z.enum(['CONTAINS', 'EQUALS', 'JSON']), jsonPath: z.string().nullable() }).passthrough()
  })
  .passthrough()
const EvaluationAssertion = z
  .object({
    id: z.string(),
    evaluationId: z.string(),
    target: z.string(),
    matcher: z.object({ type: z.enum(['CONTAINS', 'EQUALS', 'JSON']), jsonPath: z.string().nullable() }).passthrough()
  })
  .passthrough()
const EvaluationBody = z
  .object({
    promptId: z.string(),
    appendedMessages: z.array(
      z
        .object({
          content: z.string().nullable(),
          role: z.enum(['USER', 'ASSISTANT', 'SYSTEM', 'TOOL']),
          toolCallId: z.string().nullable(),
          toolCalls: z
            .array(
              z
                .object({
                  toolCallId: z.string(),
                  type: z.literal('function'),
                  function: z.object({ arguments: z.string(), name: z.string() }).passthrough()
                })
                .passthrough()
            )
            .nullable()
        })
        .passthrough()
    ),
    variables: z.record(z.unknown().nullable())
  })
  .passthrough()
const Evaluation = z
  .object({
    id: z.string(),
    promptId: z.string(),
    appendedMessages: z.array(
      z
        .object({
          content: z.string().nullable(),
          role: z.enum(['USER', 'ASSISTANT', 'SYSTEM', 'TOOL']),
          toolCallId: z.string().nullable(),
          toolCalls: z
            .array(
              z
                .object({
                  toolCallId: z.string(),
                  type: z.literal('function'),
                  function: z.object({ arguments: z.string(), name: z.string() }).passthrough()
                })
                .passthrough()
            )
            .nullable()
        })
        .passthrough()
    ),
    variables: z.record(z.unknown().nullable())
  })
  .passthrough()
const PromptMessage = z
  .object({
    content: z.string().nullable(),
    role: z.enum(['USER', 'ASSISTANT', 'SYSTEM', 'TOOL']),
    toolCallId: z.string().nullable(),
    toolCalls: z
      .array(
        z
          .object({
            toolCallId: z.string(),
            type: z.literal('function'),
            function: z.object({ arguments: z.string(), name: z.string() }).passthrough()
          })
          .passthrough()
      )
      .nullable()
  })
  .passthrough()
const ToolFunctionCall = z
  .object({ toolCallId: z.string(), type: z.literal('function'), function: z.object({ arguments: z.string(), name: z.string() }).passthrough() })
  .passthrough()
const ToolParameters = z.record(z.unknown().nullable())

export const schemas = {
  PromptConfiguration,
  ErrorResponse,
  PromptBody,
  ToolBody,
  Tool,
  EvaluationAssertionBody,
  EvaluationAssertion,
  EvaluationBody,
  Evaluation,
  PromptMessage,
  ToolFunctionCall,
  ToolParameters
}

const endpoints = makeApi([
  {
    method: 'post',
    path: '/sdk/v1/evaluation-assertions',
    alias: 'createEvaluationAssertion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to create a new Evaluation Assertion',
        type: 'Body',
        schema: EvaluationAssertionBody
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: EvaluationAssertion,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/evaluation-assertions',
    alias: 'getEvaluationAssertions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'evaluationId',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.array(EvaluationAssertion),
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/evaluation-assertions/:evaluationAssertionId',
    alias: 'getEvaluationAssertion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'evaluationAssertionId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: EvaluationAssertion,
    errors: [
      {
        status: 400,
        description: 'Validation Error',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Evaluation Assertion not found',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'put',
    path: '/sdk/v1/evaluation-assertions/:evaluationAssertionId',
    alias: 'updateEvaluationAssertion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to update the Evaluation Group',
        type: 'Body',
        schema: EvaluationAssertionBody
      },
      {
        name: 'evaluationAssertionId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: EvaluationAssertion,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'delete',
    path: '/sdk/v1/evaluation-assertions/:evaluationAssertionId',
    alias: 'deleteEvaluationAssertion',
    description: 'Delete a evaluationAssertion by ID.',
    requestFormat: 'json',
    parameters: [
      {
        name: 'evaluationAssertionId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.object({ success: z.boolean() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden request due to missing or invalid evaluationAssertion ID or API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'EvaluationAssertion not found',
        schema: z.object({ error: z.string() }).partial().passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'post',
    path: '/sdk/v1/evaluations',
    alias: 'createEvaluation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to create a new evaluation',
        type: 'Body',
        schema: EvaluationBody
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Evaluation,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/evaluations',
    alias: 'getEvaluations',
    requestFormat: 'json',
    parameters: [
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.array(Evaluation),
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/evaluations/:evaluationId',
    alias: 'getEvaluation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'evaluationId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Evaluation,
    errors: [
      {
        status: 400,
        description: 'Validation Error',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Evaluation not found',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'put',
    path: '/sdk/v1/evaluations/:evaluationId',
    alias: 'updateEvaluation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to update the Evaluation Group',
        type: 'Body',
        schema: EvaluationBody
      },
      {
        name: 'evaluationId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Evaluation,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'delete',
    path: '/sdk/v1/evaluations/:evaluationId',
    alias: 'deleteEvaluation',
    description: 'Delete a evaluation by ID.',
    requestFormat: 'json',
    parameters: [
      {
        name: 'evaluationId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.object({ success: z.boolean() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden request due to missing or invalid evaluation ID or API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Evaluation not found',
        schema: z.object({ error: z.string() }).partial().passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'post',
    path: '/sdk/v1/prompts',
    alias: 'createPrompt',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to create a new prompt configuration',
        type: 'Body',
        schema: PromptBody
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: PromptConfiguration,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/prompts/:promptId',
    alias: 'getPrompt',
    description:
      'Fetches detailed configuration parameters for a specified prompt, including penalty settings, response format, and preset messages that use dynamic variables.',
    requestFormat: 'json',
    parameters: [
      {
        name: 'promptId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: PromptConfiguration,
    errors: [
      {
        status: 400,
        description: 'Validation Error',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Prompt not found or not deployed',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'put',
    path: '/sdk/v1/prompts/:promptId',
    alias: 'updatePrompt',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to update a prompt configuration',
        type: 'Body',
        schema: PromptBody
      },
      {
        name: 'promptId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: PromptConfiguration,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'delete',
    path: '/sdk/v1/prompts/:promptId',
    alias: 'deletePrompt',
    description: 'Delete a prompt configuration by ID. This will remove the prompt from the system and all associated data including evaluations.',
    requestFormat: 'json',
    parameters: [
      {
        name: 'promptId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.object({ success: z.boolean() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden request due to missing or invalid prompt ID or API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Prompt not found',
        schema: z.object({ error: z.string() }).partial().passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'post',
    path: '/sdk/v1/tools',
    alias: 'createTool',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to create a new tool',
        type: 'Body',
        schema: ToolBody
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Tool,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/tools',
    alias: 'getTools',
    requestFormat: 'json',
    parameters: [
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.array(Tool),
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'get',
    path: '/sdk/v1/tools/:toolId',
    alias: 'getTool',
    requestFormat: 'json',
    parameters: [
      {
        name: 'toolId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Tool,
    errors: [
      {
        status: 400,
        description: 'Validation Error',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Tool not found',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'put',
    path: '/sdk/v1/tools/:toolId',
    alias: 'updateTool',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: 'Data needed to update a tool',
        type: 'Body',
        schema: ToolBody
      },
      {
        name: 'toolId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: Tool,
    errors: [
      {
        status: 401,
        description: 'Invalid API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'API Key Required',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  },
  {
    method: 'delete',
    path: '/sdk/v1/tools/:toolId',
    alias: 'deleteTool',
    description: 'Delete a tool configuration by ID.',
    requestFormat: 'json',
    parameters: [
      {
        name: 'toolId',
        type: 'Path',
        schema: z.string()
      },
      {
        name: 'X-API-KEY',
        type: 'Header',
        schema: z.string()
      }
    ],
    response: z.object({ success: z.boolean() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: 'Unauthorized',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 403,
        description: 'Forbidden request due to missing or invalid tool ID or API Key',
        schema: z.object({ error: z.string() }).passthrough()
      },
      {
        status: 404,
        description: 'Tool not found',
        schema: z.object({ error: z.string() }).partial().passthrough()
      },
      {
        status: 500,
        description: 'Internal Server Error',
        schema: z.object({ error: z.string() }).passthrough()
      }
    ]
  }
])

export const api = new Zodios(endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
