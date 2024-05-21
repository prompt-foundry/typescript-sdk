import { PromptConfiguration, PromptMessage } from '../types'

export function extractVariables(template: string): string[] {
  const regex = /\{\{([^{}]+)\}\}/g
  const variables = new Set<string>()
  let match: RegExpExecArray | null

  // Perform the assignment before the loop and check the condition in the while statement
  match = regex.exec(template)
  while (match) {
    variables.add(match[1].trim()) // Trim to remove any potential whitespace around variable names.
    match = regex.exec(template) // Reassign at the end of the loop block
  }

  return Array.from(variables)
}

export function extractVariablesFromMessages(messages: PromptMessage[]): string[] {
  const variables = messages.map((message) => extractVariables(message.content))

  return Array.from(new Set(variables.flat()))
}

export function renderTemplate(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{([^{}]+)\}\}/g, (_, key) => {
    return variables[key.trim()] || ''
  })
}

export function renderMessagesWithVariabels(messages: PromptMessage[], variables: Record<string, string>): PromptMessage[] {
  return messages.map((message) => {
    return {
      role: message.role,
      content: renderTemplate(message.content, variables)
    }
  })
}

export function renderPromptWithVariables(prompt: PromptConfiguration, variables: Record<string, string>): PromptConfiguration {
  return {
    ...prompt,
    promptMessages: renderMessagesWithVariabels(prompt.promptMessages, variables)
  }
}

export function getMissingPromptVariables(prompt: PromptConfiguration, variables: Record<string, string>): string[] {
  const variablesInPrompt = extractVariablesFromMessages(prompt.promptMessages)

  const missingVariables = variablesInPrompt.filter((variable) => !variables[variable])

  return missingVariables
}

export function validatePromptVariables(prompt: PromptConfiguration, variables: Record<string, string>): boolean {
  const missingVariables = getMissingPromptVariables(prompt, variables)

  if (missingVariables.length > 0) {
    return false
  }

  return true
}
