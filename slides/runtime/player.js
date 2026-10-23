import { C, FONT, B, seed, f, j, poly, setDrawingLayer } from './drawing.js';
import { mountShell } from './shell.js';

export function mountPresentation(presentation) {
  mountShell(presentation);
  const NS = 'http://www.w3.org/2000/svg';
  const layer = document.getElementById('layer');
  const pencil = document.getElementById('pencil');
  setDrawingLayer(layer);
const SCENE_META = presentation.scenes;
const SCENES = SCENE_META.map(scene => scene.render);
const TITLES = SCENE_META.map(scene => scene.title);
const sceneSeed = id => [...id].reduce((value, char) => Math.imul(value ^ char.charCodeAt(0), 16777619) >>> 0, 2166136261);
/* ---------- clock & tweens (pausable, speed-aware) ---------- */
let paused=false, speed=presentation.player.speed ?? 3, vt=0, last=performance.now();
let elapsed=0, clockOn=false, lastSec=-1;
const tweens = new Set();
function loop(t){
  const raw = t-last, dt = Math.min(64, raw); last = t;
  if(!paused) vt += dt*speed;
  if(started && !paused && !finished) elapsed += raw;
  if(clockOn){ const sec = Math.floor(elapsed/1000); if(sec!==lastSec){ lastSec = sec; clockEl.textContent = fmtTime(sec); } }
  for(const tw of [...tweens]){
    const p = Math.min(1, (vt-tw.t0)/tw.dur);
    tw.fn(p);
    if(p>=1){ tweens.delete(tw); tw.res(true); }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
function tween(dur, fn=()=>{}){ return new Promise(res => { const tw={t0:vt,dur:Math.max(1,dur),fn,res}; tweens.add(tw); fn(0); }); }
function cancelAll(){ for(const tw of tweens) tw.res(false); tweens.clear(); }

const movePencil = (x,y) => pencil.setAttribute('transform',`translate(${f(x)},${f(y)})`);
let pencilOn = false, drawMode = 'simple', drawing = false;
const clockEl = document.getElementById('clock'), countEl = document.getElementById('count'), progEl = document.querySelector('#prog i');
const fmtTime = sec => { const h=Math.floor(sec/3600), m=Math.floor(sec/60)%60, z=sec%60, p=n=>String(n).padStart(2,'0'); return (h?h+':'+p(m):p(m))+':'+p(z); };
function setProg(frac){ const n = ORDER.length||1; progEl.style.width = (Math.min(1,(cur+frac)/n)*100).toFixed(2)+'%'; }
let manual = false, advanceRes = null;
let extraHold = presentation.player.holdSeconds ?? 1;
const showPencil = v => { pencil.style.opacity = (v && pencilOn) ? 1 : 0; };

/* ---------- playing ops ---------- */
let gen=0, cur=0, uid=0, finished=false, started=false;
async function playOp(op, grp, g){
  if(g!==gen) return false;
  if(op.k==='w'){ showPencil(false); return drawMode==='none' ? true : tween(op.ms); }
  if(op.k==='p'){
    const el = document.createElementNS(NS,'path');
    el.setAttribute('d',op.d); el.setAttribute('stroke',op.c); el.setAttribute('stroke-width',op.w);
    grp.appendChild(el);
    if(drawMode==='none') return true;
    const L = el.getTotalLength();
    el.style.strokeDasharray = `${L} ${L+4}`; el.style.strokeDashoffset = L;
    showPencil(true);
    const ok = await tween(Math.min(1600, Math.max(160, L/0.9)), p => {
      el.style.strokeDashoffset = L*(1-p);
      const pt = el.getPointAtLength(L*p); movePencil(pt.x, pt.y);
    });
    if(ok) el.style.strokeDasharray = 'none';
    return ok;
  }
  if(op.k==='t'){
    const el = document.createElementNS(NS,'text');
    el.setAttribute('x',op.x); el.setAttribute('y',op.y);
    el.setAttribute('text-anchor', op.a||'start');
    el.setAttribute('font-family', FONT[op.f||'h']);
    el.setAttribute('font-size', op.size||40);
    el.setAttribute('font-weight', op.wt||500);
    el.setAttribute('fill', op.c||C.chalk);
    el.textContent = op.s;
    grp.appendChild(el);
    if(drawMode==='none'){
      if(!op.u) return true;
      const bb0 = el.getBBox(), y = op.y + (op.size||40)*.17, pts=[];
      for(let i=0;i<=5;i++) pts.push([bb0.x-6+(bb0.width+12)*i/5, y+j(3)]);
      return playOp({k:'p', d:poly(pts,false,2), c:op.u, w:3.5}, grp, g);
    }
    const bb = el.getBBox();
    const id = 'clip'+(++uid);
    const cp = document.createElementNS(NS,'clipPath'); cp.id = id;
    const r = document.createElementNS(NS,'rect');
    r.setAttribute('x',bb.x-12); r.setAttribute('y',bb.y-16); r.setAttribute('height',bb.height+32); r.setAttribute('width',0);
    cp.appendChild(r); grp.appendChild(cp);
    el.setAttribute('clip-path',`url(#${id})`);
    showPencil(true);
    const n = op.s.length;
    const ok = await tween(Math.min(2600, Math.max(300, bb.width/0.6)), p => {
      r.setAttribute('width', (bb.width+24)*p);
      movePencil(bb.x + bb.width*p, bb.y + bb.height*(.55 + .2*Math.sin(p*n*2.3)));
    });
    if(!ok) return false;
    if(op.u){
      const y = op.y + (op.size||40)*.17, x0 = bb.x-6, x1 = bb.x+bb.width+6, pts=[];
      for(let i=0;i<=5;i++) pts.push([x0+(x1-x0)*i/5, y+j(3)]);
      return playOp({k:'p', d:poly(pts,false,2), c:op.u, w:3.5}, grp, g);
    }
    return true;
  }
  return true;
}

async function runScene(i){
  const g = ++gen; cur = i; finished = false; updateUI();
  layer.innerHTML = '';
  const grp = document.createElementNS(NS,'g');
  grp.setAttribute('filter','url(#pencilFx)');
  layer.appendChild(grp);
  const sid = ORDER[i];
  seed(sceneSeed(SCENE_META[sid].id));
  const b = B(); SCENES[sid](b);
  setProg(0); drawing = true;
  if(!await tween(drawMode==='none' ? 120 : 350) || g!==gen) return;
  const total = b.ops.length || 1; let done = 0;
  for(const op of b.ops){
    if(!await playOp(op, grp, g) || g!==gen) return;
    setProg(++done/total*.9);
    if(drawMode!=='none' && (!await tween(60) || g!==gen)) return;
  }
  drawing = false; setProg(1);
  showPencil(false);
  if(cur >= ORDER.length-1){ finished = true; updateUI(); showBar(); return; }
  if(manual){ const ok = await new Promise(r => { advanceRes = r; }); if(!ok || g!==gen) return; }
  else if(!await tween(2600 + extraHold*1000*speed) || g!==gen) return;
  if(!await tween(700, p => { grp.style.opacity = 1-p; }) || g!==gen) return;
  runScene(cur+1);
}
function advance(){
  if(!started || finished) return;
  if(advanceRes){ const r = advanceRes; advanceRes = null; r(true); }
  else jump(cur+1);
}
function jump(i){ if(!started) return start(i); if(advanceRes){ const r = advanceRes; advanceRes = null; r(false); } cancelAll(); paused = false; showPencil(false); runScene(Math.max(0, Math.min(ORDER.length-1, i))); }

/* ---------- controls ---------- */
const bar = document.getElementById('bar'), stage = document.getElementById('stage');
const playBtn = document.getElementById('play'), speedBtn = document.getElementById('speed');
const dots = document.getElementById('dots');
const mfCtl = document.getElementById('mfCtl');
const [mfStartCtl, mfEndCtl] = mfCtl.querySelectorAll('label');
const hasOptionalOpening = SCENE_META.some(scene => scene.optional && scene.role==='opening');
const hasOptionalClosing = SCENE_META.some(scene => scene.optional && scene.role==='closing');
let ORDER = [], mfStart = hasOptionalOpening && (presentation.player.opening ?? true), mfEnd = hasOptionalClosing && (presentation.player.closing ?? true);
document.getElementById('mfStartChk').checked = mfStart;
document.getElementById('mfEndChk').checked = mfEnd;
mfStartCtl.hidden = !hasOptionalOpening;
mfEndCtl.hidden = !hasOptionalClosing;
mfCtl.hidden = !hasOptionalOpening && !hasOptionalClosing;
function buildDots(){
  dots.innerHTML = '';
  ORDER.forEach((sid,i) => { const t = TITLES[sid]; const d=document.createElement('button'); d.title=t; d.setAttribute('aria-label',`Scene ${i+1}: ${t}`); d.onclick=()=>jump(i); dots.appendChild(d); });
}
function buildOrder(){
  const sid = ORDER[cur];
  ORDER = SCENE_META.flatMap((scene, index) => {
    if(!scene.optional) return [index];
    if(scene.role==='opening') return mfStart ? [index] : [];
    if(scene.role==='closing') return mfEnd ? [index] : [];
    return [index];
  });
  if(sid !== undefined) cur = Math.max(0, ORDER.indexOf(sid));
  buildDots();
  if(typeof updateUI === 'function') updateUI();
}
buildOrder();
function updateUI(){
  [...dots.children].forEach((d,i) => d.classList.toggle('on', i===cur));
  countEl.textContent = `${cur+1} / ${ORDER.length}`;
  const icon = !started ? '▶' : finished ? '↺' : (paused ? '▶' : '❚❚');
  playBtn.textContent = icon;
  playBtn.setAttribute('aria-label', !started ? 'Start' : finished ? 'Restart' : (paused ? 'Resume' : 'Pause'));
}
function togglePlay(){
  if(!started) return start();
  if(finished) return restart();
  paused = !paused; updateUI(); showBar();
}
let hideT;
function showBar(){ /* the toolbar now appears only on hover near the bottom edge */ }
const setBar = v => bar.classList.toggle('hide', !v);
function nearBar(y){ const r = bar.getBoundingClientRect(); return y > r.top - 50; }
function onPointer(y){
  const near = nearBar(y);
  setBar(near);
  stage.classList.remove('nocursor');
  clearTimeout(hideT);
  hideT = setTimeout(() => { if(!bar.matches(':hover')) stage.classList.add('nocursor'); }, 2000);
}
const SPEEDS = [.75,1,1.5,2,2.5,3,4,5];
speedBtn.onclick = () => { speed = SPEEDS[(SPEEDS.indexOf(speed)+1)%SPEEDS.length]; speedBtn.textContent = speed+'×'; showBar(); };
speedBtn.textContent = speed+'×';
playBtn.onclick = togglePlay;
updateUI();
document.getElementById('prev').onclick = () => jump(cur-1);
document.getElementById('next').onclick = () => jump(cur+1);
function restart(){ elapsed = 0; lastSec = -1; if(clockOn) clockEl.textContent = fmtTime(0); jump(0); }
document.getElementById('restart').onclick = restart;
function toggleFs(){ try{ if(document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }catch(e){} }
document.getElementById('fs').onclick = toggleFs;
const drawRadios = [...document.querySelectorAll('input[name="draw"]')];
const DRAW_MODES = ['simple','pencil','none'];
function setDraw(m){
  const prev = drawMode; drawMode = m;
  drawRadios.forEach(r => r.checked = r.value===m);
  pencilOn = m==='pencil'; if(!pencilOn) pencil.style.opacity = 0;
  if(m==='none' && prev!=='none' && started && drawing) jump(cur);
}
setDraw(presentation.player.drawMode ?? 'simple');
drawRadios.forEach(r => r.addEventListener('change', () => { if(r.checked) setDraw(r.value); }));
const setPencil = v => setDraw(v ? 'pencil' : 'simple');
const clockChk = document.getElementById('clockChk');
function setClock(v){ clockOn = v; clockChk.checked = v; clockEl.hidden = !v; lastSec = -1; if(v) clockEl.textContent = fmtTime(Math.floor(elapsed/1000)); }
clockChk.addEventListener('change', () => setClock(clockChk.checked));
const manualChk = document.getElementById('manualChk');
function setManual(v){
  manual = v; manualChk.checked = v;
  if(!v && advanceRes){ const r = advanceRes; advanceRes = null; r(true); }
  showBar();
}
setManual(presentation.player.manual ?? false);
manualChk.addEventListener('change', () => setManual(manualChk.checked));
document.getElementById('mfStartChk').addEventListener('change', e => { mfStart = e.target.checked; buildOrder(); });
document.getElementById('mfEndChk').addEventListener('change', e => { mfEnd = e.target.checked; buildOrder(); });
const holdIn = document.getElementById('holdIn');
holdIn.addEventListener('input', () => { const v = parseFloat(holdIn.value); extraHold = isFinite(v) ? Math.max(0, Math.min(60, v)) : 0; });
holdIn.addEventListener('change', () => { holdIn.value = extraHold; });
stage.addEventListener('mousemove', e => onPointer(e.clientY), {passive:true});
stage.addEventListener('mouseleave', () => setBar(false));
stage.addEventListener('touchstart', e => { const t = e.touches[0]; if(t) onPointer(t.clientY); }, {passive:true});
document.addEventListener('keydown', e => {
  if(e.target && e.target.name === 'draw' && e.key.startsWith('Arrow')) return;
  if(e.target && e.target.id === 'holdIn'){ if(e.key==='Enter' || e.key==='Escape') e.target.blur(); return; }
  if(e.key===' '){ e.preventDefault(); togglePlay(); }
  else if(e.key==='ArrowRight') jump(cur+1);
  else if(e.key==='ArrowLeft') jump(cur-1);
  else if(e.key==='r'||e.key==='R'||e.key==='Home'){ e.preventDefault(); restart(); }
  else if(e.key==='End'){ e.preventDefault(); jump(ORDER.length-1); }
  else if(e.key==='d'||e.key==='D') setDraw(DRAW_MODES[(DRAW_MODES.indexOf(drawMode)+1)%3]);
  else if(e.key==='t'||e.key==='T') setClock(!clockOn);
  else if(e.key==='f'||e.key==='F') toggleFs();
  else if(e.key==='p'||e.key==='P') setPencil(!pencilOn);
  else if(e.key==='m'||e.key==='M') setManual(!manual);
  else if(e.key==='Enter'){ if(e.target && e.target.closest && e.target.closest('button')) return; e.preventDefault(); advance(); }
});

async function start(at){
  if(started) return; started = true;
  const first = Number.isInteger(at) ? Math.max(0, Math.min(ORDER.length-1, at)) : 0;
  document.getElementById('start').remove();
  elapsed = 0; stage.classList.add('live');
  try{
    await Promise.race([
      Promise.all([document.fonts.load('600 60px Caveat'), document.fonts.load('40px "Patrick Hand"')]),
      new Promise(r => setTimeout(r, 2500))
    ]);
  }catch(e){}
  showBar();
  runScene(first);
}
document.getElementById('startBtn').onclick = () => start();
document.getElementById('startBtn').focus();

}
