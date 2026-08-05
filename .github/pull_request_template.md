<!--
If this PR is purely technical (formatting, comments, refactoring with no behavior change),
write "No business logic affected" for fields 2, 'Business scenario' and 4, 'Why this change'. Field 3 (Objects changed) should still list what was modified.
-->

### 1. Pull request title

<!--
Give a concise title that explains the business impact, not just the technical change.
Example: "Add VAT validation before sales order posting" instead of "Fix Codeunit 80"
-->

### 2. Business scenario

<!--
Describe the real-world situation this solves. Think: what problem did
the customer or user have before this change?
Example: "Customer needs VAT validation at posting time, not after
invoice creation. Previously invalid invoices could be sent before
the finance team caught the error."
-->

### 3. Objects changed

<!--
List which codeunits, tables, pages, or events were modified.
Include the object number — it is the most stable identifier.
Example: "Codeunit 80 (Sales-Post), Table 37 (Sales Line)"
-->

### 4. Why this change

<!--
DO NOT describe what was coded. Explain WHY the business needed this.
Good: "VAT must be validated before posting because invoices were going
to customers with invalid tax IDs, requiring manual corrections."
Bad: "Added VAT validation check to Codeunit 80."
-->
