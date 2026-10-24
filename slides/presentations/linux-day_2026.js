import { definePresentation } from '../runtime/presentation.js';
import manifest from '../episodes/manifest.js';
import microApp from '../episodes/micro-app.js';
import resource from '../episodes/resource.js';

export default definePresentation({
  name: 'linux-day_2026',
  id: 'linux-day_2026',
  folder: 'events',
  title: 'What happens to software in the AI era?',
  subtitle: 'Linux day 2026',
  publishedAt: '2026-10-23',
  ariaLabel: 'Linux Day 2026: What happens to software in the AI era?',
  playlist: [
    { episode: microApp },
    { episode: resource },
    { episode: manifest, role: 'closing', optional: true },
  ],
  player: { speed: 5, drawMode: 'simple', holdSeconds: 1, manual: true },
});
