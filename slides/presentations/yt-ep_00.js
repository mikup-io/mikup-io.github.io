import { definePresentation } from '../runtime/presentation.js';
import manifest from '../episodes/manifest.js';
import microApp from '../episodes/micro-app.js';

export default definePresentation({
  id: 'yt-ep_00',
  title: 'What happens to software in the AI era?',
  publishedAt: '2026-10-23',
  ariaLabel: 'Animated Mikup sketchboard: What happens to software in the AI era?',
  playlist: [
    { episode: microApp },
    { episode: manifest, role: 'closing', optional: true },
  ],
  player: { speed: 5, drawMode: 'simple', holdSeconds: 1, manual: true },
});
