export const C = { chalk:'#ecebe6', dim:'#8f8e88', yel:'#f4d35e', cy:'#7fd3e6', red:'#ff7a6b', grn:'#9be38f', org:'#f5a35c' };
export const FONT = { h:'Caveat, "Patrick Hand", cursive', l:'"Patrick Hand", Caveat, cursive' };
const NS = 'http://www.w3.org/2000/svg';

/* ---------- seeded randomness for the hand-drawn wobble ---------- */
let _s = 1;
let layer;
export const setDrawingLayer = value => { layer = value; };
export const seed = n => { _s = n >>> 0; };
export function rnd(){ _s |= 0; _s = _s + 0x6D2B79F5 | 0; let t = Math.imul(_s ^ _s >>> 15, 1 | _s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
export const j = a => (rnd()*2 - 1) * a;
export const f = n => Math.round(n*10)/10;

/* ---------- hand-drawn primitives ---------- */
export function seg(a, b, bow){
  const dx=b[0]-a[0], dy=b[1]-a[1], len=Math.hypot(dx,dy)||1;
  const k = j(bow*Math.min(1,len/150) + .5);
  return ` Q${f((a[0]+b[0])/2 - dy/len*k)} ${f((a[1]+b[1])/2 + dx/len*k)} ${f(b[0])} ${f(b[1])}`;
}
export function poly(pts, closed=false, bow=3){
  pts = pts.map(p => [p[0]+j(1.2), p[1]+j(1.2)]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for(let i=1;i<pts.length;i++) d += seg(pts[i-1], pts[i], bow);
  if(closed){
    const a=pts[pts.length-1], s=pts[0], n=pts[1];
    d += seg(a, s, bow);
    d += ` L${f(s[0]+(n[0]-s[0])*.07+j(2))} ${f(s[1]+(n[1]-s[1])*.07+j(2))}`;
  }
  return d;
}
export const line = (x1,y1,x2,y2,bow=3) => poly([[x1,y1],[x2,y2]], false, bow);
export const rect = (x,y,w,h,bow=3) => poly([[x,y],[x+w,y],[x+w,y+h],[x,y+h]], true, bow);
export function ell(cx,cy,rx,ry,a0=-Math.PI/2-.3,sweep=Math.PI*2+.4,wob=.03){
  const n = Math.max(20, Math.round((rx+ry)*Math.abs(sweep)/9));
  const ph = rnd()*6; let d='';
  for(let i=0;i<=n;i++){
    const a = a0 + sweep*i/n;
    const r = 1 + wob*Math.sin(a*2+ph) + (i/n)*.02;
    d += (i?' L':'M') + f(cx+Math.cos(a)*rx*r) + ' ' + f(cy+Math.sin(a)*ry*r);
  }
  return d;
}
export function arrow(x1,y1,x2,y2,bow=5,hs=18){
  const a = Math.atan2(y2-y1,x2-x1);
  return [ line(x1,y1,x2,y2,bow),
    `M${f(x2-hs*Math.cos(a-.45))} ${f(y2-hs*Math.sin(a-.45))} L${f(x2)} ${f(y2)} L${f(x2-hs*Math.cos(a+.45))} ${f(y2-hs*Math.sin(a+.45))}` ];
}
export function cyl(x,y,w,h){ const rx=w/2, ry=Math.max(9,w*.16);
  return [ ell(x+rx,y,rx,ry), line(x,y,x,y+h,1), line(x+w,y,x+w,y+h,1), ell(x+rx,y+h,rx,ry,0,Math.PI,.01), ell(x+rx,y+h*.5,rx,ry,.1,Math.PI-.2,.01) ]; }
export function doc(x,y,w,h){ const c=Math.min(26,w*.25);
  return [ poly([[x,y],[x+w-c,y],[x+w,y+c],[x+w,y+h],[x,y+h]], true, 2), poly([[x+w-c,y],[x+w-c,y+c],[x+w,y+c]], false, 1) ]; }
export function monitor(x,y,w,h){ return [ rect(x,y,w,h,2), line(x+w/2,y+h,x+w/2,y+h+28,1), line(x+w/2-40,y+h+30,x+w/2+40,y+h+30,1) ]; }
export function phone(x,y,w,h){ return [ rect(x,y,w,h,2), line(x+w/2-12,y+h-14,x+w/2+12,y+h-14,.5) ]; }
export function gear(cx,cy,r,t=10){ const pts=[], n=t*4;
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, rr=(i%4<2)?r:r*.78; pts.push([cx+Math.cos(a)*rr, cy+Math.sin(a)*rr]); }
  return [ poly(pts,true,.4), ell(cx,cy,r*.32,r*.32) ]; }
export function person(x,y,s=1){ return [ ell(x,y,18*s,18*s), line(x,y+19*s,x,y+92*s,2),
  poly([[x-36*s,y+66*s],[x,y+42*s],[x+36*s,y+66*s]],false,2), poly([[x-30*s,y+150*s],[x,y+92*s],[x+30*s,y+150*s]],false,2) ]; }
export function bubble(x,y,w,h,tx,ty){ return [ ell(x+w/2,y+h/2,w/2,h/2), poly([[x+w*.28,y+h*.86],[tx,ty],[x+w*.42,y+h*.97]],false,1) ]; }
export function star4(cx,cy,r){ const q=()=>`${f(cx+j(r*.08))} ${f(cy+j(r*.08))}`;
  return `M${f(cx)} ${f(cy-r)} Q${q()} ${f(cx+r)} ${f(cy)} Q${q()} ${f(cx)} ${f(cy+r)} Q${q()} ${f(cx-r)} ${f(cy)} Q${q()} ${f(cx)} ${f(cy-r)}`; }
export const check = (x,y,s) => poly([[x,y],[x+s*.35,y+s*.4],[x+s,y-s*.5]],false,1);
export function folder(x,y,w,h){ return poly([[x,y+14],[x,y],[x+w*.35,y],[x+w*.43,y+14],[x+w,y+14],[x+w,y+h],[x,y+h]],true,1.5); }
export function lock(cx,cy,s){ return [ ell(cx,cy,42*s,58*s,Math.PI,Math.PI,.005), rect(cx-62*s,cy,124*s,100*s,2), ell(cx,cy+40*s,10*s,10*s), line(cx,cy+50*s,cx,cy+72*s,.5) ]; }
export function globe(cx,cy,r){ return [ ell(cx,cy,r,r), ell(cx,cy,r*.42,r,-Math.PI/2,Math.PI*2+.2,.01), line(cx-r,cy,cx+r,cy,2),
  line(cx-r*.86,cy-r*.5,cx+r*.86,cy-r*.5,2), line(cx-r*.86,cy+r*.5,cx+r*.86,cy+r*.5,2) ]; }
export function cube(x,y,s){ const d=s*.4, e=s*.35;
  return [ rect(x,y,s,s,1.2), poly([[x,y],[x+d,y-e],[x+s+d,y-e],[x+s,y]],false,1), poly([[x+s+d,y-e],[x+s+d,y+s-e],[x+s,y+s]],false,1) ]; }
export function cloud(cx,cy,rx,ry){ const n=110; let d='';
  for(let i=0;i<=n+5;i++){ const a=-Math.PI/2+i/n*Math.PI*2, r=.86+.2*Math.abs(Math.sin(a*3.5));
    d += (i?' L':'M') + f(cx+Math.cos(a)*rx*r) + ' ' + f(cy+Math.sin(a)*ry*r); }
  return d; }
export function scribble(x,y,w,h,n){ const pts=[]; for(let i=0;i<n;i++) pts.push([x+rnd()*w, y+rnd()*h]); return poly(pts,false,30); }

/* ---------- scene builder ---------- */
export function B(){
  const ops=[];
  const b = {
    ops,
    p(d,c=C.chalk,w=3){ (Array.isArray(d)?d:[d]).forEach(x => ops.push({k:'p',d:x,c,w})); return b; },
    t(x,y,s,o={}){ ops.push({k:'t',x,y,s,...o}); return b; },
    w(ms){ ops.push({k:'w',ms}); return b; }
  };
  return b;
}
export function head(b,n,title,sub,u){
  b.t(110,110,'It means…',{size:32,c:C.dim,f:'l'});
  b.t(110,174,title,{size:58,wt:600,u:u?C.yel:null});
  if(sub) b.t(110,230,sub,{size:34,f:'l'});
  b.w(250);
}

/* dashed versions (one path, many sub-paths) to mark what is optional */
export function dashPts(pts, dash=20, gap=13){
  let d='', on=true, left=dash;
  for(let i=1;i<pts.length;i++){
    let [ax,ay]=pts[i-1]; const [bx,by]=pts[i];
    let L=Math.hypot(bx-ax,by-ay);
    while(L>0){
      const s=Math.min(left,L), t=s/Math.hypot(bx-ax,by-ay);
      const nx=ax+(bx-ax)*t, ny=ay+(by-ay)*t;
      if(on) d += ` M${f(ax+j(.8))} ${f(ay+j(.8))} L${f(nx+j(.8))} ${f(ny+j(.8))}`;
      ax=nx; ay=ny; L-=s; left-=s;
      if(left<=0){ on=!on; left=on?dash:gap; }
    }
  }
  return d.trim();
}
export const dashRect = (x,y,w,h) => dashPts([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]]);
export function dashEll(cx,cy,rx,ry){ const pts=[]; for(let i=0;i<=72;i++){ const a=i/72*Math.PI*2; pts.push([cx+Math.cos(a)*rx, cy+Math.sin(a)*ry]); } return dashPts(pts,18,12); }
export function bolt(x,y,s){ return poly([[x+25*s,y],[x,y+48*s],[x+20*s,y+48*s],[x+8*s,y+90*s],[x+48*s,y+34*s],[x+27*s,y+34*s],[x+40*s,y]],true,1); }
export function picture(x,y,w,h){ return [ rect(x,y,w,h,1.5), poly([[x+8,y+h-8],[x+w*.35,y+h*.45],[x+w*.55,y+h*.7],[x+w*.72,y+h*.55],[x+w-8,y+h-8]],false,1), ell(x+w*.75,y+h*.28,9,9) ]; }
export function wave(x,y,w,a){ let d=`M${f(x)} ${f(y)}`; for(let i=1;i<=40;i++){ const t=i/40; d+=` L${f(x+w*t)} ${f(y+Math.sin(t*Math.PI*6)*a*(0.3+0.7*Math.abs(Math.sin(t*Math.PI*2.3))))}`; } return d; }
export function meas(s,size,fk,wt){
  const el=document.createElementNS(NS,'text');
  el.setAttribute('font-family',FONT[fk||'h']); el.setAttribute('font-size',size); el.setAttribute('font-weight',wt||500);
  el.textContent=s; layer.appendChild(el); const w=el.getBBox().width; el.remove(); return w;
}
export function code(b,x,y,toks,size){
  const sp = meas('a a',size,'l') - meas('aa',size,'l');
  toks.forEach(([str,c]) => {
    const lead = str.length - str.trimStart().length, t = str.trim();
    x += lead*sp;
    if(t){ b.t(x,y,t,{size,f:'l',c}); x += meas(t,size,'l'); }
  });
  return x;
}
export function head2(b,kick,title,sub,u){
  b.t(110,110,kick,{size:32,c:C.dim,f:'l'});
  b.t(110,174,title,{size:58,wt:600,u:u?C.yel:null});
  if(sub) b.t(110,230,sub,{size:34,f:'l'});
  b.w(250);
}
