const fs = require('fs');

// local test
// const body = fs.readFileSync('test/test_pr_body.md', 'utf8');

// action test
const body = process.env.PR_BODY;

const lines = body.split('\n');

// Error messages
const errorMessages = {
  Empty: "'%1' must be filled.",
  TooShort: "'%1' must be at least 20 characters."
};

const issues = [];
const NoBusinessChange = 'No business logic affected';

// Parse PR body
let currentSection = '';
const sections = { title: '', scenario: '', objects: '', why: '' };

for (const line of lines) {
  if (line.startsWith('### 1.')) currentSection = 'title';
  else if (line.startsWith('### 2.')) currentSection = 'scenario';
  else if (line.startsWith('### 3.')) currentSection = 'objects';
  else if (line.startsWith('### 4.')) currentSection = 'why';
  else if (currentSection) {
    if (!line.includes('<!--') && !line.includes('-->') && line.trim() !== '') {
      sections[currentSection] += line.trim() + ' ';
    }
  }
}

// Main validattion function
function ValidateSections(title, scenario, objects, why) {
  ValidateTitle(title);
  ValidateScenario(scenario);
  ValidateObjects(objects);
  ValidateWhy(why);

  if (issues.length > 0) {
    console.log("\n─── VALIDATION FAILED ───");
    issues.forEach((e, i) => console.log(`${i + 1}. ${e}`));
    console.log("──────────────────────────\n");
    process.exit(1);
  }

  console.log("─── All validations passed ───");
  process.exit(0);
}

Object.keys(sections).forEach(k => sections[k] = sections[k].trim());

// Helper
const addIfEmpty = (value, fieldName) => {
  if (value.trim() === '') {
    issues.push(errorMessages.Empty.replace('%1', fieldName));
  }
};

// Validation functions
function ValidateTitle(title) {
  addIfEmpty(title, 'Title');
}

function ValidateScenario(scenario) {
  addIfEmpty(scenario, 'Scenario');
  if (scenario.toLowerCase() !== NoBusinessChange.toLowerCase()) {
    if (scenario.trim().length < 20) {
      issues.push(errorMessages.TooShort.replace('%1', 'Scenario'));
    }
  }
}

function ValidateObjects(objects) {
  addIfEmpty(objects, 'Objects');
  if (!/codeunit|table|page|report|xmlport|enum|interface|query|extension|controladdin|dotnet|profile|entitlement|permissionset|requestpage/i.test(objects)) {
    issues.push("Objects' must contain at least one AL object type.");
  }
}

function ValidateWhy(why) {
  addIfEmpty(why, 'Why');
  if (why.toLowerCase() !== NoBusinessChange.toLowerCase()) {
    if (why.trim().length < 20) {
      issues.push(errorMessages.TooShort.replace('%1', 'Why'));
    }
  }
}

console.log("RAW BODY:", JSON.stringify(body));
console.log("PARSED:", JSON.stringify(sections));
ValidateSections(sections.title, sections.scenario, sections.objects, sections.why);