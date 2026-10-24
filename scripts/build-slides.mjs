import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const stripExports = source => source.replaceAll('export ', '');
const episode = (source, name) => `const ${name} = (() => {\n${stripExports(source).replace(/^import .*;\n/gm, '').replace('default ', 'return ')}\n})();`;
const config = source => stripExports(source).replace(/^import .*;\n/gm, '').replace('default ', 'const presentation =');

const presentationMetadata = {};

const [css, drawing, shell, player, presentation, microApp, resource, manifest, registry] = await Promise.all([
  read('slides/runtime/deck.css'),
  read('slides/runtime/drawing.js'),
  read('slides/runtime/shell.js'),
  read('slides/runtime/player.js'),
  read('slides/runtime/presentation.js'),
  read('slides/episodes/micro-app.js'),
  read('slides/episodes/resource.js'),
  read('slides/episodes/manifest.js'),
  read('slides/presentations/registry.js'),
]);

const names = [...registry.matchAll(/name: '([^']+)'/g)].map(([, name]) => name);
for(const name of names){
  const spec = await read(`slides/presentations/${name}.js`);
  const id = spec.match(/\n  id: '([^']+)',/);
  if(!id) throw new Error(`Presentation ${name} has no id`);
  const folder = spec.match(/\n  folder: '([^']+)',/);
  if(!folder) throw new Error(`Presentation ${name} has no folder`);
  const title = spec.match(/\n  title: '([^']+)',/);
  if(!title) throw new Error(`Presentation ${name} has no title`);
  const subtitle = spec.match(/\n  subtitle: '([^']+)',/);
  if(!subtitle) throw new Error(`Presentation ${name} has no subtitle`);
  const publishedAt = spec.match(/\n  publishedAt: '([^']+)',/);
  if(!publishedAt) throw new Error(`Presentation ${name} has no publishedAt date`);
  const output = `${folder[1]}/${id[1]}.html`;
  presentationMetadata[name] = { title: title[1], subtitle: subtitle[1], publishedAt: publishedAt[1], href: `./${output}` };
  const runtime = [
    stripExports(drawing),
    stripExports(presentation),
    episode(microApp, 'microApp'),
    episode(resource, 'resource'),
    stripExports(manifest).replace(/^import .*;\n/gm, '').replace('default ', 'const manifest ='),
    config(spec),
    stripExports(shell).replace("new URL('./deck.css', import.meta.url)", "'./deck.css'"),
    player.replace(/^import .*;\n/gm, '').replace('export function mountPresentation', 'function mountPresentation'),
    'presentation.standalone = true;',
    'mountPresentation(presentation);',
  ].join('\n\n');
  const html = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n  <title>${title[1]}</title>\n  <style>\n${css}\n  </style>\n</head>\n<body>\n  <script>\n${runtime}\n  </script>\n</body>\n</html>\n`;
  await mkdir(new URL('.', new URL(`slides/${output}`, root)), { recursive: true });
  await writeFile(new URL(`slides/${output}`, root), html);
}

const catalog = `${stripExports(registry)}

const presentationMetadata = ${JSON.stringify(presentationMetadata)};
const catalogPresentations = presentations.map(presentation => ({
  ...presentation,
  ...presentationMetadata[presentation.name],
})).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const formatDate = date => new Intl.DateTimeFormat('en', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(date + 'T00:00:00Z'));

document.querySelector('#presentations').innerHTML = catalogPresentations.map(({ title, subtitle, publishedAt, href }) => \`
  <a class="presentation" href="\${href}">
    <h2>\${title}</h2>
    <time class="date" datetime="\${publishedAt}">\${formatDate(publishedAt)}</time>
    <p>\${subtitle}</p>
    <span class="open">Open</span>
  </a>
\`).join('');
`;
await writeFile(new URL('slides/index.js', root), catalog);
