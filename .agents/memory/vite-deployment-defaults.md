---
name: Vite deployment defaults
description: Environment-specific build behavior for this pnpm workspace.
---

Vercel-style workspace builds may invoke Vite without Replit's PORT and BASE_PATH environment variables. Vite configs must use build-safe defaults for those variables instead of throwing during config loading.

**Why:** The root workspace build previously failed before compiling because artifact Vite configs required Replit-only environment variables; defaults preserve Replit runtime behavior while allowing external static builds.

**How to apply:** When adding or copying a Vite artifact in this workspace, default the port for local preview/build config and default the base path to `/`, while artifact.toml continues to provide Replit-specific values.