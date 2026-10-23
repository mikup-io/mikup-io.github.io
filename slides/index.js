const presentations = [
  {
    id: 'yt-ep_00',
    description: 'An introduction to Mikup as a Micro App.',
    href: './yt/ep_00.html',
  },
  {
    id: 'yt-ep_01',
    description: 'The Resource model, lifecycle, and HTTP access.',
    href: './yt/ep_01.html',
  },
];


const presentationMetadata = {"yt-ep_00":{"title":"What happens to software in the AI era?","publishedAt":"2026-10-23"},"yt-ep_01":{"title":"Resource: the first-class citizen","publishedAt":"2026-10-22"}};
const catalogPresentations = presentations.map(presentation => ({
  ...presentation,
  ...presentationMetadata[presentation.id],
})).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const formatDate = date => new Intl.DateTimeFormat('en', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(date + 'T00:00:00Z'));

document.querySelector('#presentations').innerHTML = catalogPresentations.map(({ title, publishedAt, description, href }) => `
  <a class="presentation" href="${href}">
    <span class="eyebrow">Presentation</span>
    <h2>${title}</h2>
    <time class="date" datetime="${publishedAt}">${formatDate(publishedAt)}</time>
    <p>${description}</p>
    <span class="open">Open</span>
  </a>
`).join('');
