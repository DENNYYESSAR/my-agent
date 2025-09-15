# my-agent

This project is an AI Code Review Agent built using `@ai-sdk/ai` and Google's Gemini 2.5 Flash model. It's designed to automate code reviews by:

*   **Fetching Code Changes:** It uses a `getFileChangesInDirectoryTool` to identify modifications within a specified directory.
*   **Generating Commit Messages:** It can create concise commit messages based on the detected code changes using a `generateCommitMessageTool`.
*   **Creating Review Summaries:** It generates a detailed markdown summary of the code review, including suggestions, using a `generateMarkdownFileTool`.

The agent is configured with a comprehensive `SYSTEM_PROMPT` to act as an expert code reviewer, focusing on correctness, clarity, maintainability, and other best practices.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
