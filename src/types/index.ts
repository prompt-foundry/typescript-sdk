import { Components } from './openapi'

export type PromptConfiguration = Components.Schemas.PromptConfiguration
export type PromptMessage = Components.Schemas.PromptConfiguration['promptMessages'][0]
