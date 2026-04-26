# Windows Installer Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Windows 10/11 (for native installer build)

## Build installer

```bash
npm install
npm run dist:win
```

## Output

- Installer artifacts are generated in `release/`.
- Default target: NSIS (`.exe`).

## Troubleshooting

- If packaging fails due to missing build tools, update Node.js and rerun.
- If anti-virus blocks output, whitelist the project folder temporarily.
