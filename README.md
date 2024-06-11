# @prompt-foundry/typescript-sdk

The TypeScript/ JavasScript prompt engineering, prompt management, and prompt testing tool.

## Installation

```bash
npm install @prompt-foundry/typescript-sdk
```

## Usage

```typescript
import PromptFoundry from '@prompt-foundry/typescript-sdk'

const pf = new PromptFoundry({
  apiKey: '<API_KEY>'
})

const prompt = await pf.prompts.get({ promptId: 'HELLO' })
```
