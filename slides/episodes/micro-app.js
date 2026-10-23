import { C, FONT, B, seed, rnd, f, j, poly, setDrawingLayer, head, head2, line, rect, ell, arrow, cyl, doc, monitor, phone, gear, person, bubble, star4, check, folder, lock, globe, cube, cloud, scribble, dashRect, dashEll, bolt, picture, wave, meas, code } from '../runtime/drawing.js';

export const scenes = [
/* 0 · Micro App */
b => {
  b.t(800,190,'Mikup',{size:130,c:C.yel,a:'middle',wt:700});
  b.t(800,262,'= Micro App',{size:58,a:'middle'}).w(300);
  const cs=[];
  for(let r=0;r<3;r++) for(let c=0;c<4;c++){ const x=150+c*72+j(6), y=380+r*68+j(6); cs.push([x+17,y+17]); b.p(rect(x,y,34,34,1.5),C.chalk,2.5); }
  for(let k=0;k<9;k++){ const a=cs[Math.floor(rnd()*12)], z=cs[Math.floor(rnd()*12)]; if(a!==z) b.p(line(a[0],a[1],z[0],z[1],10),C.dim,1.5); }
  b.t(285,700,'microservices',{size:44,a:'middle'});
  b.t(285,745,'too fine-grained',{size:30,a:'middle',f:'l',c:C.dim}).w(250);
  b.p(rect(1190,360,260,270,2),C.chalk,5);
  for(let k=0;k<14;k++){ const x=1210+rnd()*200, y=390+rnd()*200; b.p(line(x,y+26,x+26,y,1),C.dim,2); }
  b.t(1320,700,'monolith',{size:44,a:'middle'});
  b.t(1320,745,'too rigid',{size:30,a:'middle',f:'l',c:C.dim}).w(250);
  const boxes=[[625,380],[830,380],[728,530]];
  boxes.forEach(([x,y]) => b.p(rect(x,y,145,110),C.yel,3.5));
  b.p(line(770,435,830,435,2),C.yel,2.5).p(line(700,490,760,530,2),C.yel,2.5).p(line(900,490,840,530,2),C.yel,2.5);
  boxes.forEach(([x,y]) => { b.p(line(x+20,y+30,x+110,y+30,1),C.dim,2).p(line(x+20,y+55,x+92,y+55,1),C.dim,2).p(line(x+20,y+80,x+70,y+80,1),C.dim,2); });
  b.t(800,700,'Micro App',{size:48,c:C.yel,a:'middle',wt:700});
  b.t(800,745,'the right balance',{size:30,a:'middle',f:'l'});
},
/* 1 · framework */
b => {
  b.t(800,150,'A framework to',{size:56,a:'middle'});
  b.t(800,228,'simplify and speed up',{size:78,c:C.yel,a:'middle',wt:700,u:C.yel}).w(300);
  b.p(rect(170,360,360,260),C.chalk,3);
  b.p(scribble(200,390,300,200,26),C.dim,2.2);
  b.t(350,675,'complexity',{size:44,a:'middle'}).w(200);
  b.p(arrow(570,490,860,490,6,22),C.yel,4);
  b.t(715,462,'Mikup',{size:40,c:C.yel,a:'middle',wt:700}).w(200);
  const x=1060, y=490;
  b.p(`M${x} ${y-34} Q${x+160} ${y-58} ${x+250} ${y+2} Q${x+160} ${y+60} ${x} ${y+34} L${x} ${y-36}`,C.chalk,3.5);
  b.p(ell(x+165,y,17,17),C.cy,3);
  b.p(poly([[x+30,y-36],[x-12,y-78],[x+80,y-42]]),C.chalk,3).p(poly([[x+30,y+36],[x-12,y+78],[x+80,y+42]]),C.chalk,3);
  b.p(poly([[x,y-20],[x-55,y-12],[x-25,y],[x-62,y+12],[x,y+20]],false,2),C.yel,3);
  b.p(line(x-160,y-55,x-90,y-55,1),C.dim,2).p(line(x-180,y,x-95,y,1),C.dim,2).p(line(x-160,y+55,x-90,y+55,1),C.dim,2);
  b.t(1185,675,'speed',{size:44,a:'middle'}).w(400);
  b.t(800,790,'for enterprise applications with a substantial backend',{size:38,a:'middle',f:'l'});
},
/* 2 · single grammar */
b => {
  b.t(800,150,'One single grammar',{size:82,c:C.yel,a:'middle',wt:700,u:C.yel});
  b.t(800,222,'to send and receive anything from the system',{size:38,a:'middle',f:'l'}).w(300);
  b.p(person(220,420,1.1),C.chalk,3);
  b.p(bubble(250,290,190,85,235,398),C.chalk,2.5);
  b.t(345,342,'I need…',{size:30,a:'middle',f:'l'});
  b.p(arrow(300,465,590,465),C.chalk,3);
  b.t(445,448,'request',{size:28,a:'middle',f:'l',c:C.dim});
  b.p(rect(600,410,320,170),C.yel,4);
  b.t(760,485,'Mikup',{size:56,c:C.yel,a:'middle',wt:700});
  b.t(760,540,'one grammar',{size:28,a:'middle',f:'l',c:C.dim});
  b.p(arrow(590,535,300,535),C.chalk,3);
  b.t(445,575,'response',{size:28,a:'middle',f:'l',c:C.dim}).w(200);
  b.p(arrow(930,480,1165,335),C.chalk,2.5).p(cyl(1180,290,90,80),C.chalk,3).t(1310,345,'data',{size:36,f:'l'});
  b.p(arrow(930,490,1170,466),C.chalk,2.5).p(doc(1188,420,74,92),C.chalk,3).t(1310,475,'documents',{size:36,f:'l'});
  b.p(arrow(930,505,1158,592),C.chalk,2.5).p(monitor(1170,560,110,70),C.chalk,3).t(1310,605,'interfaces',{size:36,f:'l'});
  b.p(arrow(930,520,1182,722),C.chalk,2.5).p(gear(1225,735,38,9),C.chalk,3).t(1310,750,'logic',{size:36,f:'l'});
},
/* 3 · no application server */
b => {
  head(b,1,'no web containers or application servers to manage');
  b.p(rect(200,320,560,420),C.chalk,3);
  b.t(230,365,'Application Server',{size:36,f:'l'});
  b.p(rect(250,395,460,300),C.chalk,2.5);
  b.t(275,435,'web container',{size:32,f:'l',c:C.dim});
  [290,390,490].forEach(x => b.p(doc(x,470,70,90),C.dim,2.2));
  b.t(480,640,'deploy, descriptors, classloaders…',{size:28,a:'middle',f:'l',c:C.dim}).w(300);
  b.p(line(190,310,770,750,10),C.red,6).p(line(770,310,190,750,10),C.red,6).w(200);
  b.p(arrow(820,530,1050,530,6,22),C.yel,4);
  b.p(rect(1080,440,300,180),C.yel,4);
  b.t(1230,522,'Mikup',{size:56,c:C.yel,a:'middle',wt:700});
  b.t(1230,580,'it just starts',{size:30,a:'middle',f:'l'});
  b.p(check(1170,690,50),C.grn,4);
  b.t(1235,705,'no server to manage',{size:32,f:'l',c:C.grn});
},
/* 4 · DSLs and databases */
b => {
  head(b,2,'no database languages to learn','thanks to DSLs');
  b.p(person(230,430,1),C.chalk,3);
  b.p(bubble(280,300,220,90,252,412),C.chalk,2.5);
  b.t(390,355,'one language',{size:28,a:'middle',f:'l'});
  b.p(arrow(300,520,600,520),C.chalk,3);
  b.p(doc(620,390,190,250),C.yel,3.5);
  b.t(715,478,'DSL',{size:66,c:C.yel,a:'middle',wt:700});
  [[525,780],[560,770],[595,755]].forEach(([y,x2]) => b.p(line(650,y,x2,y,1),C.dim,2));
  b.t(715,700,'one grammar, many databases',{size:30,a:'middle',f:'l',c:C.yel}).w(200);
  [[320,100,385,'MongoDB'],[500,100,565,'PostgreSQL'],[680,90,740,'…']].forEach(([y,h,ty,lab],i) => {
    b.p(arrow(830,515,1105,[380,555,725][i]),C.chalk,2.5);
    b.p(cyl(1120,y,140,h),C.chalk,3);
    b.t(1290,ty,lab,{size:38,f:'l'});
  });
},
/* 5 · declarative UIs */
b => {
  head(b,3,'declarative, agnostic user interfaces','ideal for AI generation',true);
  b.p(star4(250,480,70),C.yel,3.5).p(star4(345,400,26),C.yel,3).p(star4(330,565,16),C.yel,2.5);
  b.t(250,625,'AI',{size:60,c:C.yel,a:'middle',wt:700});
  b.p(arrow(370,490,565,490),C.chalk,3);
  b.p(doc(590,320,320,380),C.chalk,3);
  b.t(625,385,'page',{size:32,f:'l'});
  b.t(645,435,'– table: orders',{size:30,f:'l'});
  b.t(645,485,'– filter: date',{size:30,f:'l'});
  b.t(645,535,'– action: save',{size:30,f:'l'});
  b.t(750,640,'what, not how',{size:34,a:'middle',c:C.yel}).w(200);
  b.p(arrow(930,450,1080,410),C.chalk,2.5);
  b.p(monitor(1100,330,260,160),C.chalk,3);
  b.p(rect(1120,350,220,26,1),C.dim,2).p(line(1120,405,1320,405,1),C.dim,2).p(line(1120,435,1300,435,1),C.dim,2).p(line(1120,465,1280,465,1),C.dim,2);
  b.p(arrow(930,560,1222,640),C.chalk,2.5);
  b.p(phone(1240,560,100,180),C.chalk,3);
  b.p(line(1255,590,1325,590,1),C.dim,2).p(line(1255,615,1315,615,1),C.dim,2).p(line(1255,640,1300,640,1),C.dim,2);
  b.t(1290,795,'web, mobile, …',{size:30,a:'middle',f:'l',c:C.dim});
},
/* 6 · configuration */
b => {
  head(b,4,'no worrying about configuration','even as it keeps evolving');
  b.p(gear(520,420,85,10),C.chalk,3).p(gear(668,368,55,8),C.yel,3);
  b.p(arrow(160,660,1450,660,4),C.chalk,3);
  [320,600,880,1160].forEach((x,i) => {
    b.p(rect(x-55,585,110,50,1.5),C.chalk,2.5);
    b.t(x,620,'v'+(i+1),{size:34,a:'middle',f:'l'});
    b.p(line(x,636,x,656,.5),C.dim,2);
  });
  b.t(1360,620,'v…',{size:34,a:'middle',f:'l',c:C.dim}).w(250);
  b.t(1150,400,'Mikup handles it',{size:48,c:C.yel,a:'middle',wt:700});
  b.p(check(1110,475,70),C.grn,4).w(200);
  b.t(800,770,'configurations change, you keep building',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 7 · business rules */
b => {
  head(b,5,'business rules, just like any other file','same way, same place');
  b.p(folder(200,320,150,100),C.chalk,3);
  b.t(370,385,'project',{size:38,f:'l'});
  b.p(line(240,430,240,700,2),C.dim,2);
  [[480,'data',C.chalk],[590,'interfaces',C.chalk],[700,'business rule',C.yel]].forEach(([y,lab,c]) => {
    b.p(line(240,y,320,y,1),C.dim,2);
    b.p(doc(330,y-42,62,80),c,2.8);
    b.t(410,y+10,lab,{size:34,f:'l',c});
  });
  b.w(200);
  b.p(arrow(680,700,870,600,30),C.yel,3);
  b.p(rect(880,420,520,230),C.yel,3.5);
  b.t(915,490,'if  customer.tier = "gold"',{size:34,f:'l'});
  b.t(915,545,'then  discount = 10%',{size:34,f:'l'});
  b.t(915,610,'it is a file, like all the others',{size:30,f:'l',c:C.dim});
},
/* 8 · permission */
b => {
  head(b,6,'no permission management to worry about');
  [[250,430],[360,415],[470,430]].forEach(([x,y]) => b.p(person(x,y,.6),C.chalk,2.5));
  b.t(360,600,'users',{size:38,a:'middle'});
  b.p(arrow(530,500,690,500),C.chalk,3);
  b.p(lock(800,470,1.4),C.yel,4);
  b.t(800,680,'who can do what',{size:40,a:'middle',c:C.yel,wt:700}).w(200);
  b.p(arrow(910,520,1090,440),C.chalk,2.5).p(arrow(910,560,1090,620),C.chalk,2.5);
  b.p(doc(1110,370,80,100),C.chalk,2.8).p(cyl(1240,385,90,80),C.chalk,2.8);
  b.p(monitor(1110,560,110,70),C.chalk,2.8).p(cube(1260,580,60),C.chalk,2.8);
  b.t(1250,770,'resources',{size:38,a:'middle'}).w(200);
  b.t(800,830,'not your concern',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 9 · generative vs deterministic */
b => {
  head(b,7,'keeping generative and deterministic apart','AI on one side, transactions on the other');
  b.p(cloud(430,440,200,110),C.cy,3);
  b.p(star4(370,430,28),C.yel,2.5).p(star4(470,465,20),C.yel,2.5).p(star4(520,410,14),C.yel,2);
  b.t(430,625,'generative',{size:54,c:C.cy,a:'middle',wt:700});
  b.t(430,672,'AI, language, ideas',{size:30,a:'middle',f:'l',c:C.dim}).w(200);
  b.p(line(800,290,800,720,4),C.dim,2.5).p(line(806,300,804,712,4),C.dim,1.5).w(150);
  b.p(gear(1080,430,70,10),C.chalk,3).p(gear(1190,385,45,8),C.chalk,3);
  b.p(check(1268,470,52),C.grn,4);
  b.t(1170,625,'deterministic',{size:54,a:'middle',wt:700});
  b.t(1170,672,'transactions, rules, data',{size:30,a:'middle',f:'l',c:C.dim}).w(250);
  b.t(800,795,'two worlds, cleanly separated',{size:40,a:'middle',c:C.yel});
},
/* 10 · API */
b => {
  head(b,8,'a self-documenting, standard API','ready to spread across the web');
  b.p(doc(210,320,240,300),C.chalk,3);
  b.t(330,482,'{ }',{size:92,c:C.yel,a:'middle',wt:700});
  b.p(line(240,545,420,545,1),C.dim,2).p(line(240,580,390,580,1),C.dim,2);
  b.t(330,690,'API standard',{size:46,a:'middle'});
  b.p(arrow(470,470,600,470),C.chalk,3);
  b.p(doc(620,360,180,230),C.chalk,3);
  [420,455,490,525,560].forEach((y,i) => b.p(line(645,y,770-i*8,y,1),C.dim,2));
  b.t(710,650,'documentation',{size:34,a:'middle',f:'l'});
  b.t(710,692,'built in',{size:34,a:'middle',f:'l',c:C.yel}).w(200);
  b.p(arrow(820,470,1040,470),C.chalk,3);
  b.p(globe(1200,470,140),C.cy,3);
  b.p(arrow(1335,410,1440,340),C.cy,2.5).p(ell(1458,328,10,10),C.cy,2.5);
  b.p(arrow(1340,525,1445,585),C.cy,2.5).p(ell(1462,594,10,10),C.cy,2.5);
  b.p(arrow(1240,335,1300,262),C.cy,2.5).p(ell(1312,248,10,10),C.cy,2.5);
  b.t(1200,690,'across the web',{size:38,a:'middle',c:C.cy});
},
/* 11 · Harness */
b => {
  head(b,9,'a powerful Application Harness','Mikup itself is the harness: agents and skills live inside it');
  b.p(rect(200,300,1200,450,2),C.yel,5);
  [[220,320],[1380,320],[220,730],[1380,730]].forEach(([x,y]) => b.p(ell(x,y,6,6),C.yel,2.5));
  b.t(245,358,'Mikup',{size:50,c:C.yel,wt:700});
  b.t(385,358,'= the Application Harness',{size:34,f:'l',c:C.yel}).w(250);
  b.p(star4(300,470,36),C.cy,3.5).p(star4(368,505,22),C.cy,3);
  b.t(330,570,'agents',{size:38,a:'middle',c:C.cy,wt:700});
  [262,322,382].forEach(x => { b.p(rect(x,600,48,58,1),C.chalk,2.5); b.p(check(x+12,632,24),C.grn,2.5); });
  b.t(330,712,'skills',{size:38,a:'middle',wt:700}).w(200);
  b.p(cube(580,490,70),C.chalk,3).p(cube(780,420,70),C.chalk,3).p(cube(960,490,70),C.chalk,3).p(cube(740,620,60),C.chalk,3);
  b.p(line(680,510,778,460,4),C.dim,2).p(line(880,460,958,510,4),C.dim,2).p(line(615,562,738,642,4),C.dim,2).p(line(826,642,995,562,4),C.dim,2);
  b.t(615,600,'order',{size:26,a:'middle',f:'l',c:C.dim});
  b.t(815,520,'customer',{size:26,a:'middle',f:'l',c:C.dim});
  b.t(995,600,'item',{size:26,a:'middle',f:'l',c:C.dim});
  b.t(775,710,'rule',{size:26,a:'middle',f:'l',c:C.dim}).w(150);
  b.p(arrow(415,495,565,515),C.cy,3);
  b.t(490,478,'native access',{size:24,a:'middle',f:'l',c:C.cy});
  b.p(arrow(440,630,728,648,6),C.chalk,2.5);
  b.t(585,612,'use',{size:24,a:'middle',f:'l',c:C.dim}).w(150);
  b.p(ell(1230,500,50,50),C.chalk,3.5).p(line(1266,536,1325,595,1),C.chalk,6);
  b.t(1250,665,'it knows and reaches',{size:30,a:'middle',f:'l'});
  b.t(1250,702,'every object',{size:30,a:'middle',f:'l'});
  b.t(800,810,'agents and skills are defined inside Mikup, like any other resource',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 12 · conversational */
b => {
  head(b,10,'a conversational approach','for any feature');
  b.p(person(210,450,1.1),C.chalk,3);
  b.p(bubble(240,300,400,110,215,428),C.cy,3);
  b.t(440,365,'show me today\'s orders',{size:30,a:'middle',f:'l'});
  b.p(arrow(320,560,790,560,8),C.cy,3).w(150);
  [[820,330,'orders'],[1150,330,'customers'],[820,570,'inventory'],[1150,570,'invoices']].forEach(([x,y,lab]) => {
    b.p(rect(x,y,250,150),C.chalk,3);
    b.t(x+125,y+90,lab,{size:40,a:'middle'});
    b.p(ell(x+245,y-8,36,22),C.cy,2.5).p(poly([[x+228,y+10],[x+214,y+28],[x+246,y+13]],false,1),C.cy,2.5);
    b.t(x+245,y+2,'…',{size:30,a:'middle',c:C.cy});
  });
  b.w(200);
  b.t(800,810,'every feature answers in natural language',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 13 · resource driven */
b => {
  b.t(800,150,'But how do we get all of this?',{size:66,a:'middle',wt:600}).w(400);
  b.t(800,225,'the answer is adopting a',{size:38,a:'middle',f:'l',c:C.dim});
  b.t(800,305,'Resource Driven System',{size:76,c:C.yel,a:'middle',wt:700,u:C.yel}).w(350);
  b.p(rect(330,380,940,260,2),C.chalk,3);
  b.p(line(330,425,1270,425,1),C.dim,1.5);
  b.p(ell(360,403,7,7),C.red,2).p(ell(385,403,7,7),C.yel,2).p(ell(410,403,7,7),C.grn,2);
  b.t(385,505,'Resource = resolve(FQN, context)',{size:50,f:'l'});
  b.t(385,590,'Content  = Resource.getContent( … )',{size:50,f:'l'}).w(350);
  b.t(330,762,'FQN + context',{size:38,f:'l',c:C.cy});
  b.p(arrow(560,750,690,750),C.chalk,3);
  b.t(625,730,'resolve',{size:26,a:'middle',f:'l',c:C.dim});
  b.p(ell(800,748,105,42),C.yel,3);
  b.t(800,762,'Resource',{size:40,a:'middle',c:C.yel,wt:700});
  b.p(arrow(915,750,1060,750),C.chalk,3);
  b.t(988,730,'getContent',{size:26,a:'middle',f:'l',c:C.dim});
  b.t(1080,762,'Content',{size:38,f:'l',c:C.cy});
}
];
const titles = ['Micro App','The framework','One single grammar','No application server','DSLs and databases','Declarative UIs','Configuration','Business rules','Permissions','Generative vs deterministic','API','Application Harness','Conversational','Resource Driven'];
const sceneIds = [
  'micro-app',
  'framework',
  'single-grammar',
  'no-application-server',
  'dsls-and-databases',
  'declarative-uis',
  'configuration',
  'business-rules',
  'permissions',
  'generative-vs-deterministic',
  'api',
  'application-harness',
  'conversational',
  'resource-driven',
];

export default { id: 'micro-app', title: 'What happens to software in the AI era?', scenes: scenes.map((render, index) => ({ id: 'micro-app/' + sceneIds[index], title: titles[index], render })) };
