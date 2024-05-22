import { Components } from './openapi'

export type PromptConfiguration = Components.Schemas.PromptConfiguration
export type PromptMessage = Components.Schemas.PromptMessage
export type PromptMessageRole = PromptMessage['role']
export type PromptTool = Components.Schemas.Tool
export enum PromptMessageRoleEnum {
  SYSTEM = 'SYSTEM',
  ASSISTANT = 'ASSISTANT',
  USER = 'USER',
  TOOL = 'TOOL'
}
