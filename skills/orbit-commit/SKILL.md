---
name: orbit-commit
description: Prepare and create scoped Git commits for Orbit Retail projects when the user asks to commit changes. Does not push, publish, or deploy implicitly.
---

# Orbit commit

Read repository instructions and inspect branch, status, staged diff and unstaged diff. Identify changes belonging to the request; preserve unrelated and pre-existing work.

Follow the repository's commit convention. If none is specified, use a concise Conventional Commit title, such as `fix(http): preserve validation status`. Describe the resulting behavior, not the conversation.

Run checks relevant to the change and report failures accurately. Stage explicit paths or hunks; inspect the staged diff for unintended files, generated artifacts and credentials before committing. Respect hooks; do not bypass a failure merely to produce a commit. Do not amend an existing commit unless requested or already authorized.

Create the commit when requested, then report branch, short hash, scope and validation. A request to commit alone does not authorize pushing or deployment.
