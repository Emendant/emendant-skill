import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skill = readFileSync(join(root, 'skills/emendant/SKILL.md'), 'utf8');
const match = /^---\n([\s\S]*?)\n---\n/.exec(skill);
if (!match) throw new Error('SKILL.md has no frontmatter');
const description = /^description: (.*)$/m.exec(match[1])?.[1];
if (!description) throw new Error('SKILL.md frontmatter has no description');

const workflow = `---\ndescription: ${description}\n---\n${skill.slice(match[0].length)}`;
if (workflow.length > 12000) throw new Error(`the Windsurf workflow is ${workflow.length} characters, over Windsurf's 12000`);

const target = join(root, 'windsurf/workflows/emendant.md');
if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(target, 'utf8');
  } catch {}
  if (current !== workflow) {
    console.error('windsurf/workflows/emendant.md is out of date. Run node scripts/windsurf.mjs');
    process.exit(1);
  }
} else {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, workflow);
}
