import { definePresentation } from '../runtime/presentation.js';
import manifest from '../episodes/manifest.js';
import resource from '../episodes/resource.js';

export default definePresentation({
  id: 'yt-ep_01',
  title: 'Resource: the first-class citizen',
  publishedAt: '2026-10-22',
  ariaLabel: 'Animated Mikup sketchboard: Resource, the first-class citizen',
  playlist: [
    { episode: resource },
    { episode: manifest, role: 'closing', optional: true },
  ],
  player: { speed: 5, drawMode: 'simple', holdSeconds: 1, manual: true },
});
