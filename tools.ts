import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";

const excludeFiles = ["dist", "bun.lock"];

const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  const summary = await git.diffSummary();
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;
    const diff = await git.diff(["--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});

const commitMessageInput = z.object({
  diff: z.string().min(1).describe("The diff of the changes"),
});

type CommitMessageInput = z.infer<typeof commitMessageInput>;

async function generateCommitMessage({ diff }: CommitMessageInput) {
  // In a real scenario, you'd use an AI model here to generate the commit message
  // For now, let's return a placeholder
  return `feat: commit message for changes:\n\n${diff.substring(0, 100)}...`;
}

export const generateCommitMessageTool = tool({
  description: "Generates a commit message based on the provided code changes.",
  inputSchema: commitMessageInput,
  execute: generateCommitMessage,
});

const markdownFileInput = z.object({
  fileName: z.string().min(1).describe("The name of the markdown file"),
  content: z.string().min(1).describe("The content of the markdown file"),
});

type MarkdownFileInput = z.infer<typeof markdownFileInput>;

async function generateMarkdownFile({ fileName, content }: MarkdownFileInput) {
  const fs = require("fs/promises");
  await fs.writeFile(`${fileName}.md`, content);
  return `Successfully created ${fileName}.md`;
}

export const generateMarkdownFileTool = tool({
  description: "Generates a markdown file with the provided content and file name.",
  inputSchema: markdownFileInput,
  execute: generateMarkdownFile,
});
