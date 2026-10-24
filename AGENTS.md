# Repository Guide

## Scope and Run

- This is a dependency-free static site: there is no package manifest, test suite, or CI configuration. Run `node scripts/build-slides.mjs` after changing slide source; it creates the file-launchable presentation bundles and catalog script.
- Presentations can be opened directly from the filesystem at `slides/index.html` or `slides/yt/ep_00.html`. Serve the repository root with `python3 -m http.server 8000` only for browser checks that need HTTP.
- `index.html` is the current one-scene landing animation. Open `/slides/index.html` for the presentation catalog; `/slides/yt/ep_00.html` and `/slides/yt/ep_01.html` are presentation launchers.

## Animation Editing

- Read `slides/specs/SLIDE_SYSTEM.md` before creating or changing episodes, presentations, player behavior, or generated slide bundles.
- Shared shell, drawing primitives, and player behavior are under `slides/runtime/`; do not duplicate runtime changes in presentation launchers.
- Add or edit scene content in `slides/episodes/`. Presentations in `slides/presentations/` compose complete episodes or named complete scenes and own player defaults.
- `slides/episodes/manifest.js` is an optional opening/closing episode. The player resolves each presentation playlist into `ORDER`; it does not reserve scene index `0` for the manifest.
- Generated presentation HTML under each configured publication folder, plus `slides/index.js`, must not be edited directly; edit their source modules and rebuild instead.
- The SVG coordinate system is fixed at `1600 x 900`; use those coordinates for scene placement rather than viewport pixels.
- Drawing helpers consume seeded randomness. Keep scene ids stable when deterministic redraws matter; the player derives the seed from the resolved scene id.
- `assets/images/logo.png` is referenced from the root page as `assets/images/logo.png`; retain that root-relative location or update `LOGO` accordingly.

## Verification

- Manually check modified animations in a browser: first-load font/logo rendering, scene sequencing, toolbar controls, keyboard controls, and a narrow viewport. The decks depend on Google-hosted Caveat and Patrick Hand fonts.
