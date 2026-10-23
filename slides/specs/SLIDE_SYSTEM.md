# Slide System Specification

## Purpose

This specification defines how to author, compose, build, and request Mikup animated presentations. Read it before creating or changing an episode, presentation, player behavior, or generated slide bundle.

## Terms

- A **scene** is one complete animated slide. It is the smallest unit that may appear in a playlist.
- An **episode** is a named, reusable collection of related scenes.
- A **presentation** is an ordered playlist of complete episodes and/or selected complete scenes, plus player defaults and published metadata.
- The **runtime** is shared code that mounts the SVG shell and runs the player.
- A **launcher** is a generated, standalone HTML presentation that opens directly through `file://`.

## Source And Output

| Location | Responsibility | Edit directly? |
| --- | --- | --- |
| `slides/runtime/` | Shared shell, player, CSS, drawing helpers, playlist resolver | Yes |
| `slides/episodes/` | Reusable episode scene definitions | Yes |
| `slides/presentations/` | Playlist definitions and catalog registry | Yes |
| `scripts/build-slides.mjs` | Builds standalone HTML bundles and catalog script | Yes, when adding a published presentation or dependency |
| `slides/yt/*.html` | File-launchable generated presentation bundles | No; rebuild |
| `slides/index.js` | Generated catalog script | No; rebuild |

Run `node scripts/build-slides.mjs` after any source change. The generated presentation HTML must work by direct filesystem opening; do not introduce module imports into generated HTML.

## Episode Contract

An episode has a stable id, a human-readable title, and complete scenes:

```js
export default {
  id: 'resource',
  title: 'The Resource',
  scenes: [
    {
      id: 'resource/anatomy',
      title: 'Anatomy',
      render: b => {
        // Add drawing and text operations to b.
      },
    },
  ],
};
```

- Scene ids must be stable, globally descriptive, and use the `episode-id/scene-id` form.
- Do not renumber scenes or derive their ids from presentation order. The player derives deterministic drawing seeds from scene ids.
- A scene must render a complete visual/narrative unit. Do not make playlist entries that select a fragment of a scene.
- Use the shared primitives from `slides/runtime/drawing.js`; add a primitive there only when it is reusable across episodes.
- Design in the fixed `1600 x 900` SVG coordinate system.

`manifest.js` is a normal episode. It may be included as an optional opening and/or closing item; the player has no reserved manifest scene index.

## Presentation Contract

Presentations use `definePresentation()` and own their metadata, playlist, and player defaults:

```js
export default definePresentation({
  id: 'product-overview',
  title: 'Mikup - Product Overview',
  publishedAt: '2026-10-23',
  ariaLabel: 'Animated Mikup product overview',
  playlist: [
    { episode: manifest, role: 'opening', optional: true },
    { episode: microApp },
    { episode: resource, scenes: ['anatomy', 'metadata'] },
    { episode: bio, role: 'closing', optional: true },
  ],
  player: { speed: 3, drawMode: 'simple', holdSeconds: 1 },
});
```

`title` is the single source of truth for the presentation name. It is used by the start screen and document title; the build derives the catalog title from it. Do not duplicate it in the registry. `publishedAt` is an ISO `YYYY-MM-DD` date; the catalog displays it and orders presentations newest first.

Playlist rules:

- `{ episode }` includes every scene in that episode in episode order.
- `{ episode, scenes: [...] }` includes only the named complete scenes, in the exact order listed by the presentation.
- Scene selection accepts a scene id suffix such as `anatomy` or a full id such as `resource/anatomy`.
- `role: 'opening'` and `role: 'closing'` together with `optional: true` make an item controllable by the player’s opening/closing toggles.
- The player renders a role toggle only when the resolved presentation contains an optional item for that role.
- When an optional role is absent from a presentation, its player state is `false`. For a present optional role, `player.opening` or `player.closing` can explicitly set the initial state; both otherwise default to `true`.
- The same episode may be included multiple times, either complete or as different selections.
- A user may refer to a scene by its visible position, for example “scene 3 of Resource.” Resolve that request against the current episode order, confirm the resolved title when ambiguity is possible, then write the stable scene id into the playlist.

Current player defaults are `speed`, `drawMode` (`simple`, `pencil`, or `none`), `holdSeconds`, and `manual`.

## Publishing A Presentation

To add a new published presentation:

1. Create `slides/presentations/<id>.js` using the presentation contract.
2. Add its description and generated HTML href to `slides/presentations/registry.js`.
3. Add `[<id>, <output-path>]` to `entries` in `scripts/build-slides.mjs`.
4. If it imports a new episode, add that episode to the builder’s source list and runtime bundle sequence. The current dependency-free builder explicitly lists bundled episodes.
5. Run `node scripts/build-slides.mjs`.
6. Open `slides/index.html` and the generated HTML directly from the filesystem.

## Creating Or Extending Episodes

For a new episode, obtain or define:

- Episode id and title.
- Audience and the one-sentence outcome of the episode.
- Ordered scene titles and the narrative progression between them.
- Required technical terms, code snippets, assets, and any factual constraints.
- Whether it should be included in an existing presentation, a new presentation, or both.

For a new scene in an existing episode, obtain or define:

- Target episode and insertion point. A position alone is acceptable if the existing episode has an unambiguous order.
- Scene title and the single message it must communicate.
- Required visual elements, labels, code, data, and transitions from the preceding/following scenes.
- Whether the scene is reusable outside the current presentation.

When adding a scene, add the render function and its stable id to the episode. Update any presentation that should include it; complete-episode entries gain it automatically, while explicit scene selections must be updated deliberately.

## Prompt Handling And Clarification

Accept requests in plain language, such as:

- “Create a presentation named `sales-overview` with this description. Include the full Micro App episode and scenes 2, 4, and 5 from Resource.”
- “Create an episode about permissions with these scene titles and this narrative.”
- “Add a slide after Metadata in Resource explaining ownership.”

Ask one concise clarification batch before editing when any of these is missing or ambiguous:

- The target episode or presentation cannot be identified.
- A requested scene position maps to multiple plausible scenes or the episode order is not known.
- A new presentation lacks a title, description, or requested episode/scene sequence.
- A new episode or scene lacks its intended message, title, or placement.
- Content requires factual, visual, asset, or branding decisions that the request does not supply.

Do not ask for information already available in the repository. If a safe default is explicit here, use it: `simple` draw mode, speed `3`, hold `1` second, and optional manifest opening/closing only when the requester asks for them.

When a prompt creates or changes an episode, scene, presentation, runtime, or catalog entry, run `node scripts/build-slides.mjs` before reporting completion. This keeps the file-launchable HTML presentations and catalog script synchronized with their source modules.

## Verification

After a source change:

1. Run `node scripts/build-slides.mjs`.
2. Confirm modified generated HTML has no module syntax and opens via `file://`.
3. Manually check start screen, scene sequence, optional opening/closing scenes, draw modes, timer, keyboard controls, and a narrow viewport.
4. Confirm the catalog links to each new generated presentation.
