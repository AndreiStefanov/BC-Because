const fs = require('fs');

const body = process.env.PR_BODY;
const prNumber = process.env.PR_NUMBER;
const mergeSha = process.env.PR_MERGE_SHA;
const mergedAt = process.env.PR_MERGED_AT;

//  Parsing section
const lines = body.split('\n');
let currentSection = '';
const sections = { scenario: '', objects: '', why: '' };

for (const line of lines) {
  if (line.startsWith('### 2.')) currentSection = 'scenario';
  else if (line.startsWith('### 3.')) currentSection = 'objects';
  else if (line.startsWith('### 4.')) currentSection = 'why';
  else if (currentSection) {
    if (!line.includes('<!--') && !line.includes('-->') && line.trim() !== '') {
      sections[currentSection] += line.trim() + ' ';
    }
  }
}

Object.keys(sections).forEach(k => sections[k] = sections[k].trim());

// Extract object names
const objectNames = sections.objects
  .split(/,\s*/)
  .map(obj => obj.replace(/\s*\(.*?\)\s*/g, '').trim())
  .filter(obj => obj.length > 0);

// Build entries
const newEntries = objectNames.map(obj => ({
  object: obj,
  pr: parseInt(prNumber),
  commit: mergeSha,
  date: mergedAt,
  scenario: sections.scenario,
  why: sections.why
}));

// Append to json
const historyPath = 'tracker/history.json';
let history = [];

try {
  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }
} catch (e) {
  console.log('No existing history — creating new file.');
}

history.push(...newEntries);
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
console.log(`✓ Appended ${newEntries.length} entries to history.json`);