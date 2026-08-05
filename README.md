# BC Because

**Business-aware pull requests for Microsoft Dynamics 365 Business Central.**

Every code change should answer one question: *Because what?*

## What it does

Enforces a structured business-context summary on every pull request. Before a PR can be merged, the developer fills in:

- **Business scenario** — what real-world situation does this solve?
- **Objects changed** — which codeunits, tables, pages were modified?
- **Why this change** — what works differently now, and why does it matter?

On merge, BC Because builds a living changelog grouped by object — a filterable history page showing every change ever made to every codeunit, with who made it and why.

## How to install

1. Copy `.github/workflows/action.yaml` into your repo
2. Copy `.github/pull_request_template.md` into `.github/`
3. Copy `src/` and `docs/` folders into your repo
4. Done — BC Because runs on every PR

## How it works
PR opened → Template pre-fills → Dev fills 3 fields
→ Action validates → Posts summary comment
→ PR merged → History updated → Object timeline grows

No AI. No codebase analysis. No manual tags. Two minutes per PR.

## View the changelog

Enable GitHub Pages on your repo (Settings → Pages → `main` branch, `/tracker` folder), then open:

`https://your-username.github.io/your-repo/tracking_page`

Filter by object type, PR, author, or search across all entries. Export to CSV.
// test trigger test/run-20260805-132251
// test trigger test/run-20260805-134132
