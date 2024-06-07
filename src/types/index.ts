import { z } from 'zod'

import { schemas } from '../openapi/client'

export type PromptConfiguration = z.infer<typeof schemas.PromptConfiguration>
export type PromptConfigurationBody = z.infer<typeof schemas.PromptBody>
export type PromptMessage = z.infer<typeof schemas.PromptMessage>
export type PromptMessageRole = PromptMessage['role']
export type PromptTool = z.infer<typeof schemas.Tool>
export type PromptToolBody = z.infer<typeof schemas.ToolBody>
export enum PromptMessageRoleEnum {
  SYSTEM = 'SYSTEM',
  ASSISTANT = 'ASSISTANT',
  USER = 'USER',
  TOOL = 'TOOL'
}

export type Evaluation = z.infer<typeof schemas.Evaluation>
export type EvaluationBody = z.infer<typeof schemas.EvaluationBody>
export type EvaluationGroup = z.infer<typeof schemas.EvaluationGroup>
export type EvaluationGroupBody = z.infer<typeof schemas.EvaluationGroupBody>
