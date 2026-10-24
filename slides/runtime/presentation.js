export function definePresentation({ name, id, folder, title, subtitle, publishedAt, ariaLabel, playlist, player = {} }) {
  const scenes = playlist.flatMap(item => {
    const chosen = item.scenes ? item.scenes.map(sceneId => item.episode.scenes.find(scene => scene.id.endsWith('/' + sceneId) || scene.id === sceneId)).filter(Boolean) : item.episode.scenes;
    return chosen.map(scene => ({ ...scene, role: item.role, optional: Boolean(item.optional) }));
  });
  return { name, id, folder, title, subtitle, publishedAt, ariaLabel, scenes, player };
}
