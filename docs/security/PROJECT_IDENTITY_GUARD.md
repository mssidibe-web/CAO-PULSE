# Project identity guard

## Purpose
Prevent execution of the CAO PULSE pack in a workspace that cannot positively prove it is the intended product repository.

## Design principle
The guard uses **positive identity assertions**, not keyword blacklists. This avoids self-referential rules where documentation about an unwanted context can trigger the same rule it describes.

## Verified assertions
`npm run identity:check` validates:
1. `PROJECT_IDENTITY.json` exists and contains the expected product/client/package identifiers.
2. `package.json` matches the package identity.
3. `README.md`, `HERMES.md`, `PROMPT_BOOTSTRAP.md` and `START_HERE_HERMES.md` contain required CAO PULSE markers.
4. The canonical cahier des charges exists and its SHA-256 matches the signed value in `PROJECT_IDENTITY.json`.
5. The working directory name clearly identifies CAO PULSE.
6. If Git is initialized, the Git root equals the current pack root.
7. If an origin remote exists, its repository slug positively matches the CAO PULSE naming rule.
8. If `HERMES_PROFILE` is present, it equals the expected dedicated profile.

## Failure behavior
Any failed assertion exits non-zero before coding or installation work. The report states which positive assertion failed and how to correct it.
