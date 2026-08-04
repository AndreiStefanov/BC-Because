# BC-Because
Business-aware pull requests for Microsoft Dynamics 365 Business Central.

## Problem

Code tells you **what** changed. Tickets tell you **what was requested**. Neither tells you **why the business needed this change.**

In BC development teams, the business context behind a PR lives in people's heads, Slack threads, or consultant conversations. Six months later, nobody remembers why Codeunit 80 was modified. New developers can't review with confidence. Seniors leave and take years of process knowledge with them. Existing tools (AL analyzers, AppSourceCop, CodeCop) tell you whether code follows best practices — they can't explain the business reason.## Problem

Code tells you **what** changed. Tickets tell you **what was requested**. Neither tells you **why the business needed this change.**

In BC development teams, the business context behind a PR lives in people's heads, Slack threads, or consultant conversations. Six months later, nobody remembers why Codeunit 80 was modified. New developers can't review with confidence. Seniors leave and take years of process knowledge with them. Existing tools (AL analyzers, AppSourceCop, CodeCop) tell you whether code follows best practices — they can't explain the business reason.

## Solution

A lightweight GitHub Action that enforces a structured business-context summary on every pull request. Three fields, two minutes per PR. No AI, no codebase analysis, no manual XML tags.