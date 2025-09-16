# Project Development Rules

Based on the AI-assisted brainstorming for new features, the following high-level rules and patterns should be adhered to in this project:

1.  **Utility Function Location:** All new utility functions should be organized within a `src/utils` directory. Group related functions into a single file (e.g., `stringUtils.ts` for string manipulation functions).

2.  **Clear Function Signatures and Documentation:** Every function should have a clear, descriptive signature with type annotations. JSDoc comments must be used to explain the function's purpose, describe each parameter, detail the return value, and mention any specific edge cases or assumptions.

3.  **Robust Input Handling:** Functions must gracefully handle common edge cases for their inputs. For string manipulation functions, this includes handling `null`, `undefined`, empty strings, and strings composed solely of whitespace.

4.  **Performance and Efficiency Considerations:** For operations that might involve large inputs (e.g., extensive string processing), developers should be mindful of performance implications. Choose algorithms that are efficient for the expected scale of inputs, or include comments noting potential performance bottlenecks for extreme edge cases.
