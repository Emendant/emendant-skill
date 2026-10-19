# Emendant skill for coding agents

`/emendant` lets Claude Code, Codex, Cursor and Windsurf upgrade AI SDKs with [Emendant](https://emendant.com)'s release evidence instead of model memory.

The agent runs the Emendant CLI and shows you what it reports:

1. `emendant scan` finds the code a known breaking change affects.
2. `emendant fix` writes patches and proves them in an isolated copy of your repository. Each patch carries a grade: `test verified`, `typechecked` or `structurally checked`.
3. `emendant explain <change-id>` gives the guidance, the sources and the SDK Changes page for a change that has no patch. The agent edits from that guidance and says that Emendant did not verify the edit.

After the agent writes new SDK code, `emendant scan --adopted` finds calls that the installed SDK version changed or removed.

The skill adds no network request of its own. `scan` and `explain` are read-only, and `fix` writes only to `.emendant/` until you agree to apply a patch.

Covered packages include `ai`, `@ai-sdk/*`, `openai`, `@anthropic-ai/sdk`, `langchain`, `@langchain/core` and `@google/genai`. See [emendant.com/changes](https://emendant.com/changes/) for every release.

## Install

You need Node.js 20 or later. The skill runs Emendant with `npx`, so no other install is necessary.

### Claude Code

As a plugin, for every project:

```
/plugin marketplace add Emendant/emendant-skill
/plugin install emendant@emendant
```

Run it with `/emendant:emendant`, or ask Claude to upgrade one of the covered SDKs.

For one repository, copy the skill into it. Run it with `/emendant`:

```bash
mkdir -p .claude/skills/emendant
curl -fsSL https://raw.githubusercontent.com/Emendant/emendant-skill/main/skills/emendant/SKILL.md -o .claude/skills/emendant/SKILL.md
```

### Codex

As a plugin, for every project:

```bash
codex plugin marketplace add Emendant/emendant-skill
codex plugin add emendant@emendant
```

For one repository, copy the skill into it:

```bash
mkdir -p .agents/skills/emendant
curl -fsSL https://raw.githubusercontent.com/Emendant/emendant-skill/main/skills/emendant/SKILL.md -o .agents/skills/emendant/SKILL.md
```

Run it with `$emendant`, or ask Codex to upgrade one of the covered SDKs.

Codex runs commands in its own sandbox, and Emendant cannot start its sandbox inside it. So inside Codex, `fix` grades its patches `structurally checked` only. Run `npx emendant fix` in your own terminal to get the `typechecked` or `test verified` grade.

### Cursor

```bash
mkdir -p .cursor/skills/emendant
curl -fsSL https://raw.githubusercontent.com/Emendant/emendant-skill/main/skills/emendant/SKILL.md -o .cursor/skills/emendant/SKILL.md
```

### Windsurf

```bash
mkdir -p .windsurf/workflows
curl -fsSL https://raw.githubusercontent.com/Emendant/emendant-skill/main/windsurf/workflows/emendant.md -o .windsurf/workflows/emendant.md
```

Run it with `/emendant`.

## Use

```
/emendant upgrade ai to 7
/emendant what breaks if I upgrade openai to 5?
/emendant check the code you just wrote
```

## Contributing

`skills/emendant/SKILL.md` is the source. `windsurf/workflows/emendant.md` is generated from it:

```bash
node scripts/windsurf.mjs
```

Report a problem at [emendant.com/contact](https://emendant.com/contact/).

## Licence

The skill files in this repository are MIT licensed. The Emendant CLI that the skill runs is licensed separately: see [emendant.com/terms](https://emendant.com/terms/).
