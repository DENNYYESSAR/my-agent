import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool, generateCommitMessageTool, generateMarkdownFileTool } from "./tools";
import { countWords } from "./src/utils/stringUtils";

const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
      generateCommitMessageTool: generateCommitMessageTool,
      generateMarkdownFileTool: generateMarkdownFileTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

// --- Test for countWords utility --- //
const sentence1 = "Hello world";
console.log(`Words in \"${sentence1}\": ${countWords(sentence1)}`); // Expected: 2

const sentence2 = "  Another   sentence with extra spaces ";
console.log(`Words in \"${sentence2}\": ${countWords(sentence2)}`); // Expected: 5

const emptyString = "";
console.log(`Words in \"${emptyString}\": ${countWords(emptyString)}`); // Expected: 0

const nullInput = null;
console.log(`Words in null: ${countWords(nullInput)}`); // Expected: 0

const undefinedInput = undefined;
console.log(`Words in undefined: ${countWords(undefinedInput)}`); // Expected: 0

// --- Agent call ---
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file",
);