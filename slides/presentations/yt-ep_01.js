import { definePresentation } from '../runtime/presentation.js';
import manifest from '../episodes/manifest.js';
import resource from '../episodes/resource.js';

export default definePresentation({
  name: 'yt-ep_01',
  id: 'ep_01',
  folder: 'yt',
  title: 'Resource: the first-class citizen',
  subtitle: 'The Resource model, lifecycle, and HTTP access.',
  publishedAt: '2026-10-22',
  ariaLabel: 'Animated Mikup sketchboard: Resource, the first-class citizen',
  playlist: [
    { episode: resource },
    { episode: manifest, role: 'closing', optional: true },
  ],
  player: { speed: 5, drawMode: 'simple', holdSeconds: 1, manual: true },
});
