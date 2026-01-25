---
description: Create a structured bug report from error details
---

1. **Input Collection**
   - Ask the user for the "What": A short summary of the bug.
   - Ask for the "Evidence": Paste error logs, stack traces, or reference a screenshot path.
   - Ask for the "Context": What environment? What action triggered it?

2. **Analysis**
   - Analyze the stack trace (if provided) to hypothesize the root cause.
   - Check if similar issues exist (optional search).

3. **Report Generation**
   - Generate a markdown file (e.g., `docs/bugs/BUG-[YYYYMMDD]-[short_desc].md`).
   - Use this structure:
     ```markdown
     # Bug: [Title]

     **Priority**: [P1-Critical | P2-High | P3-Medium | P4-Low]
     **Date**: [YYYY-MM-DD]

     ## Description
     [Concise description]

     ## Steps to Reproduce
     1. [Step 1]
     2. [Step 2]

     ## Expected Behavior
     [What should have happened]

     ## Actual Behavior
     [What actually happened]

     ## Evidence / Logs
     ```
     [Logs]
     ```

     ## Root Cause Analysis (Hypothesis)
     [Your analysis based on the evidence]
     ```

4. **Creation**
   - Write the file to the file system.
