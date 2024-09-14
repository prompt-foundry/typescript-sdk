# Completion

Types:

- <code><a href="./src/resources/completion.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /sdk/v1/prompts/{id}/completion">client.completion.<a href="./src/resources/completion.ts">create</a>(id, { ...params }) -> CompletionCreateResponse</code>

# Prompts

Types:

- <code><a href="./src/resources/prompts.ts">PromptConfiguration</a></code>
- <code><a href="./src/resources/prompts.ts">PromptListResponse</a></code>
- <code><a href="./src/resources/prompts.ts">PromptDeleteResponse</a></code>
- <code><a href="./src/resources/prompts.ts">PromptGetParametersResponse</a></code>

Methods:

- <code title="post /sdk/v1/prompts">client.prompts.<a href="./src/resources/prompts.ts">create</a>({ ...params }) -> PromptConfiguration</code>
- <code title="put /sdk/v1/prompts/{id}">client.prompts.<a href="./src/resources/prompts.ts">update</a>(id, { ...params }) -> PromptConfiguration</code>
- <code title="get /sdk/v1/prompts">client.prompts.<a href="./src/resources/prompts.ts">list</a>() -> PromptListResponse</code>
- <code title="delete /sdk/v1/prompts/{id}">client.prompts.<a href="./src/resources/prompts.ts">delete</a>(id) -> PromptDeleteResponse</code>
- <code title="get /sdk/v1/prompts/{id}">client.prompts.<a href="./src/resources/prompts.ts">get</a>(id) -> PromptConfiguration</code>
- <code title="post /sdk/v1/prompts/{id}">client.prompts.<a href="./src/resources/prompts.ts">getParameters</a>(id, { ...params }) -> PromptGetParametersResponse</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tools.ts">ToolListResponse</a></code>
- <code><a href="./src/resources/tools.ts">ToolDeleteResponse</a></code>

Methods:

- <code title="post /sdk/v1/tools">client.tools.<a href="./src/resources/tools.ts">create</a>({ ...params }) -> Tool</code>
- <code title="put /sdk/v1/tools/{id}">client.tools.<a href="./src/resources/tools.ts">update</a>(id, { ...params }) -> Tool</code>
- <code title="get /sdk/v1/tools">client.tools.<a href="./src/resources/tools.ts">list</a>() -> ToolListResponse</code>
- <code title="delete /sdk/v1/tools/{id}">client.tools.<a href="./src/resources/tools.ts">delete</a>(id) -> ToolDeleteResponse</code>
- <code title="get /sdk/v1/tools/{id}">client.tools.<a href="./src/resources/tools.ts">get</a>(id) -> Tool</code>

# EvaluationAssertions

Types:

- <code><a href="./src/resources/evaluation-assertions.ts">EvaluationAssertion</a></code>
- <code><a href="./src/resources/evaluation-assertions.ts">EvaluationAssertionListResponse</a></code>
- <code><a href="./src/resources/evaluation-assertions.ts">EvaluationAssertionDeleteResponse</a></code>

Methods:

- <code title="post /sdk/v1/evaluation-assertions">client.evaluationAssertions.<a href="./src/resources/evaluation-assertions.ts">create</a>({ ...params }) -> EvaluationAssertion</code>
- <code title="put /sdk/v1/evaluation-assertions/{id}">client.evaluationAssertions.<a href="./src/resources/evaluation-assertions.ts">update</a>(id, { ...params }) -> EvaluationAssertion</code>
- <code title="get /sdk/v1/evaluation-assertions">client.evaluationAssertions.<a href="./src/resources/evaluation-assertions.ts">list</a>({ ...params }) -> EvaluationAssertionListResponse</code>
- <code title="delete /sdk/v1/evaluation-assertions/{id}">client.evaluationAssertions.<a href="./src/resources/evaluation-assertions.ts">delete</a>(id) -> EvaluationAssertionDeleteResponse</code>
- <code title="get /sdk/v1/evaluation-assertions/{id}">client.evaluationAssertions.<a href="./src/resources/evaluation-assertions.ts">get</a>(id) -> EvaluationAssertion</code>

# Evaluations

Types:

- <code><a href="./src/resources/evaluations.ts">Evaluation</a></code>
- <code><a href="./src/resources/evaluations.ts">EvaluationListResponse</a></code>
- <code><a href="./src/resources/evaluations.ts">EvaluationDeleteResponse</a></code>

Methods:

- <code title="post /sdk/v1/evaluations">client.evaluations.<a href="./src/resources/evaluations.ts">create</a>({ ...params }) -> Evaluation</code>
- <code title="put /sdk/v1/evaluations/{id}">client.evaluations.<a href="./src/resources/evaluations.ts">update</a>(id, { ...params }) -> Evaluation</code>
- <code title="get /sdk/v1/evaluations">client.evaluations.<a href="./src/resources/evaluations.ts">list</a>() -> EvaluationListResponse</code>
- <code title="delete /sdk/v1/evaluations/{id}">client.evaluations.<a href="./src/resources/evaluations.ts">delete</a>(id) -> EvaluationDeleteResponse</code>
- <code title="get /sdk/v1/evaluations/{id}">client.evaluations.<a href="./src/resources/evaluations.ts">get</a>(id) -> Evaluation</code>
