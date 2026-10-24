const presentations = [
  {
    name: 'linux-day_2026',
  },
  {
    name: 'yt-ep_00',
  },
  {
    name: 'yt-ep_01',
  },
];


const presentationMetadata = {"linux-day_2026":{"title":"What happens to software in the AI era?","subtitle":"Linux day 2026","publishedAt":"2026-10-23","href":"./events/linux-day_2026.html"},"yt-ep_00":{"title":"What happens to software in the AI era?","subtitle":"An introduction to Mikup as a Micro App.","publishedAt":"2026-10-23","href":"./yt/ep_00.html"},"yt-ep_01":{"title":"Resource: the first-class citizen","subtitle":"The Resource model, lifecycle, and HTTP access.","publishedAt":"2026-10-22","href":"./yt/ep_01.html"}};
const catalogPresentations = presentations.map(presentation => ({
  ...presentation,
  ...presentationMetadata[presentation.name],
})).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const formatDate = date => new Intl.DateTimeFormat('en', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(date + 'T00:00:00Z'));

document.querySelector('#presentations').innerHTML = catalogPresentations.map(({ title, subtitle, publishedAt, href }) => `
  <a class="presentation" href="${href}">
    <h2>${title}</h2>
    <time class="date" datetime="${publishedAt}">${formatDate(publishedAt)}</time>
    <p>${subtitle}</p>
    <span class="open">Open</span>
  </a>
`).join('');
