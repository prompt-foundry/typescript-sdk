import { Components } from './openapi'

export type PromptConfiguration = Components.Schemas.PromptConfiguration
export type PromptMessage = Components.Schemas.PromptMessage
export type PromptMessageRole = PromptMessage['role']
export enum PromptMessageRoleEnum {
  SYSTEM = 'SYSTEM',
  ASSISTANT = 'ASSISTANT',
  USER = 'USER',
  TOOL = 'TOOL'
}
