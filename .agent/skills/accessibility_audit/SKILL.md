# Accessibility Audit
**Description**: Performs a static analysis of UI code (HTML, JSX, TSX, Vue) to identify common accessibility (a11y) violations.

## Usage
Use this skill when the user asks to "check accessibility", "audit UI", or "ensure WCAG compliance".

## Instructions

1. **Identify Target Files**
   - Ask the user which directory or files to audit if not specified.
   - Look for UI files: `*.html`, `*.jsx`, `*.tsx`, `*.vue`.

2. **Static Checks (Manual "Grep" Pattern Matching)**
   Run `grep` or `ripgrep` searches for these common anti-patterns:
   - **Images without alt text**: `<img` that does not have `alt=`.
   - **Buttons without labels**: `<button>` tags that are empty or only contain an icon without `aria-label`.
   - **Form inputs without labels**: `<input>` tags missing `id` (for label association) or `aria-label`.
   - **Low contrast text** (Hard to detect via grep, but check CSS for light gray text on white backgrounds if obvious).
   - **Clickable non-interactive elements**: `div` or `span` with `onClick` but missing `role="button"` and `tabIndex`.

3. **Reporting**
   - Group findings by file.
   - For each finding, provide:
     - **Location**: File and Line number.
     - **Issue**: What is wrong (e.g., "Missing alt text").
     - **Severity**: Critical (blocker), Major, Minor.
     - **Remediation**: How to fix it (e.g., "Add `alt='description'` to the img tag").

4. **Example Output**
   ```markdown
   ## Accessibility Audit Report

   ### src/components/Header.tsx
   - **[Critical] Line 15**: `<img src="logo.png" />` -> Missing `alt` attribute. Screen readers will read the filename.
     - *Fix*: `<img src="logo.png" alt="Company Logo" />`

   ### src/pages/Login.jsx
   - **[Major] Line 42**: `<div onClick={login}>Login</div>` -> Interactive element is not reachable via keyboard.
     - *Fix*: Change to `<button onClick={login}>Login</button>`
   ```
