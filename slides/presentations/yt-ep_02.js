import { definePresentation } from '../runtime/presentation.js';
import manifest from '../episodes/manifest.js';
import objects from '../episodes/objects.js';

export default definePresentation({
  name: 'yt-ep_02',
  id: 'ep_02',
  folder: 'yt',
  title: 'MK Objects and Ontology',
  subtitle: 'A unified data model',
  publishedAt: '2026-10-25',
  ariaLabel: 'Mikup sketchboard: MKO, the Mikup Object',
  playlist: [
    { episode: objects },
    { episode: manifest, role: 'closing', optional: true },
  ],
  player: { speed: 5, drawMode: 'simple', holdSeconds: 1, manual: true },
});
