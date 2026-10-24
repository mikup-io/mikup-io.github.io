import { C, FONT, B, seed, rnd, f, j, poly, setDrawingLayer, head, head2, line, rect, ell, arrow, cyl, doc, monitor, phone, gear, person, bubble, star4, check, folder, lock, globe, cube, cloud, scribble, dashRect, dashEll, bolt, picture, wave, meas, code } from '../runtime/drawing.js';

export const scenes = [
/* 1 · first-class citizen */
b => {
  b.t(800,150,'The Resource',{size:100,c:C.yel,a:'middle',wt:700,u:C.yel});
  b.t(800,222,'the first-class citizen of Mikup',{size:38,a:'middle',f:'l'}).w(300);
  b.p(ell(800,450,190,92),C.yel,4);
  b.t(800,470,'Resource',{size:66,c:C.yel,a:'middle',wt:700}).w(250);
  b.p(arrow(330,450,590,450,6,20),C.chalk,3);
  b.t(450,425,'it starts here',{size:32,a:'middle',f:'l'});
  b.p(arrow(1010,450,1270,450,6,20),C.chalk,3);
  b.t(1150,425,'it ends here',{size:32,a:'middle',f:'l'}).w(250);
  b.p(line(700,530,520,620,3),C.dim,2).p(line(800,545,800,620,2),C.dim,2).p(line(900,530,1080,620,3),C.dim,2);
  // workflow
  b.p(ell(450,670,16,16),C.chalk,2.8).p(arrow(470,670,505,670,1,10),C.chalk,2.5).p(ell(525,670,16,16),C.chalk,2.8).p(arrow(545,670,580,670,1,10),C.chalk,2.5).p(ell(600,670,16,16),C.chalk,2.8);
  b.t(525,745,'every workflow',{size:34,a:'middle',f:'l'});
  // saving
  b.p(cyl(765,640,70,55),C.chalk,2.8);
  b.t(800,745,'every save',{size:34,a:'middle',f:'l'});
  // processing
  b.p(gear(1080,672,36,9),C.chalk,2.8);
  b.t(1080,745,'every processing',{size:34,a:'middle',f:'l'}).w(250);
  b.t(800,815,'everything starts and ends with a Resource',{size:38,a:'middle',c:C.yel});
},
/* 2 · two ways to look at it */
b => {
  b.t(800,160,'Two ways to understand it',{size:70,a:'middle',wt:600}).w(300);
  b.p(rect(330,320,240,170,2),C.chalk,3);
  b.p(line(330,380,570,380,2),C.chalk,2.5);
  b.t(450,362,'metadata',{size:28,a:'middle',f:'l',c:C.yel});
  b.t(450,445,'content',{size:28,a:'middle',f:'l',c:C.dim});
  b.t(450,590,'Anatomy',{size:64,c:C.yel,a:'middle',wt:700});
  b.t(450,640,'how it is made',{size:34,a:'middle',f:'l'}).w(250);
  b.p(line(800,300,800,700,4),C.dim,2.5).p(line(806,310,804,692,4),C.dim,1.5).w(150);
  [[1030,'1'],[1150,'2'],[1270,'3']].forEach(([x,n],i) => {
    b.p(i===2 ? dashEll(x,405,40,40) : ell(x,405,40,40),C.chalk,3);
    b.t(x,420,n,{size:40,a:'middle'});
  });
  b.p(arrow(1074,405,1106,405,1,10),C.chalk,2.5).p(arrow(1194,405,1226,405,1,10),C.chalk,2.5);
  b.t(1150,590,'Definition',{size:64,c:C.yel,a:'middle',wt:700});
  b.t(1150,640,'how it comes to life',{size:34,a:'middle',f:'l'});
},
/* 3 · anatomy */
b => {
  head2(b,'Anatomy','identity, always separate from the payload','a Resource is made of two parts');
  b.t(560,295,'Resource',{size:34,f:'l',c:C.dim});
  b.p(rect(560,310,480,440),C.chalk,3);
  b.p(rect(590,340,420,160),C.yel,3.5);
  b.t(800,415,'Metadata',{size:56,c:C.yel,a:'middle',wt:700});
  b.t(800,465,'required',{size:30,a:'middle',f:'l'}).w(250);
  b.p(dashRect(590,540,420,180),C.dim,2.5);
  b.t(800,620,'Content',{size:56,a:'middle',wt:700});
  b.t(800,670,'optional',{size:30,a:'middle',f:'l',c:C.dim}).w(250);
  b.p(arrow(390,420,570,420),C.yel,3);
  b.t(280,432,'identity',{size:48,a:'middle',c:C.yel,wt:700});
  b.p(arrow(1220,630,1030,630),C.cy,3);
  b.t(1320,642,'payload',{size:48,a:'middle',c:C.cy,wt:700});
},
/* 4 · metadata */
b => {
  head2(b,'Anatomy','Metadata: the descriptive heart','a standard Mikup object, always present');
  b.p(rect(170,300,570,460),C.yel,3.5);
  b.t(205,355,'name: app',{size:32,f:'l'});
  b.t(205,398,'type: MetadataObj',{size:32,f:'l',c:C.dim}).w(200);
  b.t(205,465,'props:',{size:34,f:'l',c:C.yel,wt:700});
  b.t(320,465,'always there, for every Resource',{size:26,f:'l',c:C.dim});
  b.t(240,510,'uuid, type, permissions,',{size:30,f:'l'});
  b.t(240,550,'created, owner, modified,',{size:30,f:'l'});
  b.t(240,590,'contentPath, contentFormat, …',{size:30,f:'l'}).w(200);
  b.t(205,660,'attrs:',{size:34,f:'l',c:C.cy,wt:700});
  b.t(320,660,'specific to this Resource',{size:26,f:'l',c:C.dim});
  b.t(240,705,'xxxx, yyy',{size:30,f:'l'}).w(250);
  // 1 · catalog
  b.p(arrow(760,440,985,370,3,18),C.chalk,3);
  b.p(rect(1000,300,180,130),C.chalk,3);
  b.p(line(1000,343,1180,343,1),C.chalk,2.5).p(line(1000,386,1180,386,1),C.chalk,2.5);
  [322,365,408].forEach(y => b.p(line(1075,y,1105,y,.5),C.yel,3));
  b.t(1210,350,'1. catalogs',{size:38,c:C.yel,wt:700});
  b.t(1210,390,'the Resources',{size:32,f:'l'});
  b.t(1210,425,'by their metadata',{size:28,f:'l',c:C.dim}).w(300);
  // 2 · search
  b.p(arrow(760,560,945,590,3,18),C.chalk,3);
  b.p(ell(1000,595,42,42),C.grn,3.5).p(line(1030,625,1058,653,1),C.grn,4);
  b.p(person(880,665,.42),C.cy,2.8);
  b.t(880,790,'user profile',{size:26,a:'middle',f:'l',c:C.cy});
  b.p(arrow(905,680,968,632,2,14),C.cy,2.5);
  b.t(1045,755,'?type=…',{size:28,a:'middle',f:'l',c:C.grn});
  b.t(1045,790,'search parameters',{size:26,a:'middle',f:'l',c:C.grn});
  b.p(arrow(1042,725,1022,650,2,14),C.grn,2.5).w(200);
  b.p(arrow(1065,595,1190,595,3,18),C.yel,3);
  b.p(rect(1205,535,190,120),C.chalk,3);
  [550,588,626].forEach(y => b.p(rect(1222,y,156,24,1),C.yel,2.2));
  b.t(1300,700,'2. searches the Resources',{size:32,a:'middle',c:C.yel,wt:700});
  b.t(1300,738,'by user profile and parameters',{size:28,a:'middle',f:'l',c:C.dim});
},
/* 5 · content */
b => {
  head2(b,'Anatomy','Content: the payload it carries','optional, and in one of two forms');
  b.p(doc(290,320,240,300),C.chalk,3);
  b.t(410,480,'{ }',{size:92,c:C.yel,a:'middle',wt:700});
  b.p(rect(318,540,82,44,1),C.dim,2).t(359,572,'JSON',{size:26,a:'middle',f:'l'});
  b.t(418,572,'or',{size:24,a:'middle',f:'l',c:C.dim});
  b.p(rect(436,540,82,44,1),C.dim,2).t(477,572,'YAML',{size:26,a:'middle',f:'l'});
  b.t(410,690,'structured data',{size:46,a:'middle',wt:700});
  b.t(410,738,'a standard Mikup object',{size:30,a:'middle',f:'l',c:C.dim}).w(250);
  b.p(line(800,310,800,440,3),C.dim,2).p(line(800,560,800,720,3),C.dim,2);
  b.t(800,515,'or',{size:50,a:'middle',c:C.dim}).w(200);
  b.t(1170,370,'0100 1101 1101 0010 0110 …',{size:36,a:'middle',f:'l',c:C.cy});
  b.p(arrow(1000,400,1000,460,1,14),C.cy,2.5).p(arrow(1170,400,1170,460,1,14),C.cy,2.5).p(arrow(1340,400,1340,460,1,14),C.cy,2.5);
  b.p(doc(955,480,90,115),C.chalk,3).t(1000,560,'PDF',{size:30,a:'middle',f:'l'});
  b.p(picture(1110,490,120,95),C.chalk,3);
  b.p(wave(1280,537,120,34),C.chalk,3);
  b.t(1170,690,'byte stream',{size:46,a:'middle',wt:700,c:C.cy});
  b.t(1170,738,'a document, an image, an audio file',{size:30,a:'middle',f:'l',c:C.dim});
},
/* 6 · three verbs */
b => {
  head2(b,'Definition','three verbs bring it to life','the definition cycle of every Resource');
  [[330,'Qualify','FQN','give it a name'],[800,'Persist','Repository','decide how to store it'],[1270,'Process','Processors','elaborate it, if needed']].forEach(([x,v,r,h],i) => {
    b.t(x,345,String(i+1),{size:34,a:'middle',f:'l',c:C.dim});
    b.p(i===2 ? dashEll(x,450,140,72) : ell(x,450,140,72),i===2?C.cy:C.yel,3.5);
    b.t(x,468,v,{size:56,a:'middle',wt:700,c:i===2?C.cy:C.yel});
    b.p(arrow(x,535,x,615,2,16),C.chalk,2.5);
    b.t(x,670,r,{size:46,a:'middle',wt:700});
    b.t(x,718,h,{size:30,a:'middle',f:'l',c:C.dim}).w(200);
    if(i<2) b.p(arrow(x+150,450,x+320,450,4,18),C.chalk,3);
  });
},
/* 7 · qualify */
b => {
  head2(b,'1 · Qualify','give it a name','a unique, absolute Fully Qualified Name');
  b.t(800,330,'[prefix:]resPath[@resParams][.selectors][.extension][?params]',{size:34,a:'middle',f:'l',c:C.dim}).w(300);
  const parts = [
    ['repo/s3:', C.dim, 'prefix', 400],
    ['app/res', C.yel, 'resPath', 700],
    ['@rp1/rp2', C.red, 'resParams', 400],
    ['.s1.s2', C.chalk, 'selectors', 400],
    ['.ext', C.cy, 'extension', 400],
    ['?p1=v1&p2=v2', C.grn, 'params', 400]
  ];
  const SZ = 50, GAP = 6;
  const ws = parts.map(([s,,,wt]) => meas(s,SZ,'l',wt));
  const tot = ws.reduce((a,c)=>a+c,0) + GAP*(parts.length-1);
  let x = 830 - tot/2;
  const x0 = x;
  b.p(poly([[x0-30,440],[x0+tot+35,440],[x0+tot+35,560],[x0-30,560],[x0-80,500]],true,2),C.chalk,3);
  b.p(ell(x0-45,500,9,9),C.chalk,2.5).w(150);
  const xs = [];
  parts.forEach(([s,c,,wt],i) => { xs.push(x); b.t(x,518,s,{size:SZ,f:'l',c,wt}); x += ws[i] + GAP; });
  b.w(250);
  parts.forEach(([s,c,lab],i) => {
    const a = xs[i]+2, z = xs[i]+ws[i]-2, m = (a+z)/2, low = i%2===1;
    b.p(poly([[a,585],[a,598],[z,598],[z,585]],false,.6),c,2.2);
    if(low) b.p(line(m,602,m,640,.5),c,1.6);
    b.t(m, low?675:635, lab, {size:28,a:'middle',f:'l',c});
  });
  b.t(xs[1]+ws[1]/2,715,'the only required part',{size:26,a:'middle',f:'l',c:C.dim}).w(250);
  b.t(800,800,'unambiguous across the whole project',{size:38,a:'middle'});
},
/* 8 · persist */
b => {
  head2(b,'2 · Persist','decide how it is stored','Repositories own the physical storage strategy');
  b.p(ell(260,520,110,62),C.yel,3.5);
  b.t(260,535,'Resource',{size:38,a:'middle',c:C.yel,wt:700});
  b.p(arrow(380,520,540,520),C.chalk,3);
  b.p(rect(560,420,320,200),C.chalk,3.5);
  b.t(720,535,'Repository',{size:52,a:'middle',wt:700}).w(250);
  [[340,'relational database'],[460,'NoSQL'],[580,'file system'],[700,'object storage']].forEach(([y,lab],i) => {
    b.p(arrow(895,520,1075,y,4,16),C.chalk,2.5);
    if(i===0) b.p(cyl(1095,y-28,70,48),C.chalk,2.8);
    if(i===1) b.p(cube(1100,y-22,46),C.chalk,2.8);
    if(i===2) b.p(folder(1092,y-30,80,56),C.chalk,2.8);
    if(i===3) b.p(cloud(1132,y,48,30),C.chalk,2.8);
    b.t(1210,y+12,lab,{size:36,f:'l'});
  });
  b.t(800,815,'the Resource stays the same, the storage is a choice',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 9 · process */
b => {
  head2(b,'3 · Process','elaborate it, if needed','only active Resources reach the Processors');
  b.p(ell(260,380,105,52),C.dim,3);
  b.t(260,392,'Resource',{size:34,a:'middle',c:C.dim});
  b.t(260,470,'it just exists',{size:30,a:'middle',f:'l',c:C.dim}).w(200);
  b.p(ell(260,610,105,52),C.yel,3.5);
  b.t(260,622,'Resource',{size:34,a:'middle',c:C.yel,wt:700});
  b.t(260,700,'it has work to do',{size:30,a:'middle',f:'l'}).w(200);
  b.p(arrow(375,600,590,560),C.yel,3);
  b.t(775,390,'Processors',{size:50,a:'middle',c:C.cy,wt:700});
  b.p(rect(610,420,330,250),C.cy,3.5);
  b.p(gear(730,535,52,10),C.yel,3).p(gear(835,595,36,8),C.chalk,3).w(200);
  [[455,'business logic'],[555,'transformation'],[655,'external systems']].forEach(([y],i) => b.p(arrow(955,545,1105,y,4,14),C.chalk,2.5));
  b.p(doc(1125,420,56,70),C.chalk,2.8);
  b.p(rect(1118,535,38,38,1),C.chalk,2.8).p(ell(1188,554,19,19),C.chalk,2.8);
  b.p(ell(1135,655,13,13),C.yel,3).p(line(1148,650,1180,628,1),C.yel,2.5).p(line(1149,660,1181,682,1),C.yel,2.5).p(ell(1187,623,7,7),C.yel,2.5).p(ell(1188,687,7,7),C.yel,2.5);
  b.t(1240,467,'business logic',{size:36,f:'l'});
  b.t(1240,567,'transformation',{size:36,f:'l'});
  b.t(1240,667,'external systems',{size:36,f:'l'});
  b.t(800,815,'optional: it comes into play only when there is something to do',{size:34,a:'middle',f:'l',c:C.dim});
},
/* 10 · domain scripting */
b => {
  head2(b,'In practice','domain scripting','acquire a Resource, change it, save it back');
  b.p(rect(200,290,1050,450,2),C.chalk,3);
  b.p(line(200,335,1250,335,1),C.dim,1.5);
  b.p(ell(230,313,7,7),C.red,2).p(ell(255,313,7,7),C.yel,2).p(ell(280,313,7,7),C.grn,2);
  const S=38, X=240;
  code(b,X,410,[['Resource',C.cy],[' res',C.red],[' = Resource.resolve(',C.chalk],['"users/123"',C.yel],[', context)',C.chalk]],S);
  code(b,X,475,[['var',C.dim],[' metadata',C.red],[' = res.getMetaData()',C.chalk]],S);
  code(b,X,540,[['var',C.dim],[' content',C.red],[' = res.getContent()',C.chalk]],S); b.w(250);
  code(b,X,605,[['…',C.dim],['  // your domain logic here',C.dim]],S); b.w(250);
  code(b,X,680,[['Resource.save(',C.chalk],['"users/123"',C.yel],[', metadata, content, context);',C.chalk]],S); b.w(250);
  b.p(poly([[1270,378],[1290,378],[1290,552],[1270,552]],false,.6),C.yel,2.5);
  b.t(1315,477,'acquire',{size:40,c:C.yel,wt:700});
  b.p(poly([[1270,578],[1290,578],[1290,618],[1270,618]],false,.4),C.cy,2.5);
  b.t(1315,610,'modify',{size:40,c:C.cy,wt:700});
  b.p(poly([[1270,652],[1290,652],[1290,692],[1270,692]],false,.4),C.grn,2.5);
  b.t(1315,684,'save',{size:40,c:C.grn,wt:700}).w(250);
  b.t(800,810,'one FQN to find it, one FQN to store it',{size:36,a:'middle',f:'l',c:C.dim});
},
/* 11 · other resources */
b => {
  head2(b,'In practice','anything can be a Resource','same call, very different things');
  const S=36, X=330;
  const rows = [
    [370, '"query/mgv001@main/v2"', 'the result of a query on a generic DataSource', () => b.p(cyl(195,332,70,55),C.chalk,2.8)],
    [550, '"asset/images/foto_01"', 'a generic asset', () => b.p(picture(185,510,95,75),C.chalk,2.8)],
    [730, '"commands/invoices/print"', 'printing an invoice', () => { b.p(doc(195,682,60,78),C.chalk,2.8); b.p(gear(262,742,20,7),C.yel,2.5); }]
  ];
  rows.forEach(([y,fqn,desc,icon]) => {
    icon();
    code(b,X,y,[['Resource',C.cy],[' res',C.red],[' = Resource.resolve(',C.chalk],[fqn,C.yel],[', context);',C.chalk]],S);
    b.t(X,y+45,desc,{size:30,f:'l',c:C.dim}).w(250);
  });
},
/* 12 · at a glance */
b => {
  b.t(800,120,'A Resource at a glance',{size:62,a:'middle',wt:600}).w(250);
  // resource
  b.p(dashRect(470,390,660,230),C.red,3);
  b.t(800,442,'Resource',{size:42,a:'middle',c:C.red,wt:700});
  b.p(rect(510,470,260,100),C.yel,4.5);
  b.t(640,533,'Metadata',{size:40,a:'middle',c:C.yel,wt:700});
  b.p(rect(830,470,260,100),C.chalk,3);
  b.t(960,533,'Content',{size:40,a:'middle',wt:700}).w(250);
  // input
  b.t(225,455,'FQN',{size:44,a:'middle',c:C.yel,wt:700});
  b.t(225,512,'[ Obj / OV / OVL / Stream ]',{size:30,a:'middle',f:'l'});
  b.p(arrow(400,505,460,505,1,16),C.chalk,3).w(200);
  // repository
  b.p(arrow(800,388,800,275,2,18),C.chalk,3);
  b.p(dashRect(640,185,320,80),C.cy,3);
  b.t(800,238,'Repository',{size:42,a:'middle',c:C.cy,wt:700}).w(200);
  // processor
  b.p(arrow(1092,520,1300,520,3,18),C.chalk,3);
  b.p(rect(1310,483,220,75),C.grn,3);
  b.t(1420,533,'Processor',{size:38,a:'middle',c:C.grn,wt:700}).w(200);
  // outputs
  b.p(line(640,572,640,690,1),C.chalk,3).p(arrow(640,690,300,690,3,18),C.chalk,3);
  b.t(560,678,'resolve',{size:30,a:'middle',f:'l',c:C.dim});
  b.t(175,700,'MKO (OV)',{size:36,a:'middle'}).w(150);
  b.p(line(960,572,960,770,1),C.chalk,3).p(arrow(960,770,300,770,3,18),C.chalk,3);
  b.t(175,780,'Stream',{size:36,a:'middle'}).w(150);
  b.p(line(1420,560,1420,770,1),C.grn,3).p(arrow(1420,770,985,770,3,18),C.grn,3);
},
/* 13 · where is the web */
b => {
  head2(b,'Where is the Web in all this?','When does a Resource become web?','when a Connector exposes it');
  // connectors
  b.p(dashRect(50,300,290,490),C.org,3);
  b.t(195,345,'Connectors',{size:38,a:'middle',c:C.org,wt:700});
  b.p(rect(85,380,220,78),C.org,3).t(195,432,'HTTP',{size:40,a:'middle',wt:700});
  b.p(rect(85,485,220,78),C.org,3).t(195,537,'FTP',{size:40,a:'middle',wt:700});
  b.p(dashRect(85,590,220,78),C.dim,2.5).t(195,640,'… and more',{size:32,a:'middle',f:'l',c:C.dim}).w(250);
  // in
  b.p(arrow(345,500,505,500,2,18),C.chalk,3);
  b.t(425,478,'FQN [payload]',{size:28,a:'middle',f:'l'});
  // resource
  b.p(dashRect(520,390,560,230),C.red,3);
  b.t(800,440,'Resource',{size:40,a:'middle',c:C.red,wt:700});
  b.p(rect(550,470,230,100),C.yel,4.5).t(665,533,'Metadata',{size:38,a:'middle',c:C.yel,wt:700});
  b.p(rect(830,470,230,100),C.chalk,3).t(945,533,'Content',{size:38,a:'middle',wt:700}).w(200);
  // repository
  b.p(arrow(800,388,800,328,1,16),C.chalk,3);
  b.p(dashRect(650,255,300,66),C.cy,3).t(800,300,'Repository',{size:38,a:'middle',c:C.cy,wt:700});
  // processor
  b.p(arrow(1062,520,1235,520,2,18),C.chalk,3);
  b.p(rect(1245,483,210,75),C.grn,3).t(1350,533,'Processor',{size:36,a:'middle',c:C.grn,wt:700}).w(200);
  // back to the connectors
  b.p(line(665,572,665,690,1),C.chalk,3).p(arrow(665,690,350,690,3,18),C.chalk,3);
  b.t(590,678,'resolve',{size:28,a:'middle',f:'l',c:C.dim});
  b.t(430,676,'MKO (OV)',{size:30,a:'middle',f:'l'});
  b.p(line(945,572,945,770,1),C.chalk,3).p(arrow(945,770,350,770,3,18),C.chalk,3);
  b.t(430,756,'Stream',{size:30,a:'middle',f:'l'});
  b.p(line(1350,560,1350,770,1),C.grn,3).p(arrow(1350,770,968,770,3,18),C.grn,3);
},
/* 14 · in practice: HTTP */
b => {
  head2(b,'In practice','a Resource over HTTP','any client, through a Connector, to the Resource Handler');
  // clients
  b.p(rect(80,265,230,70),C.chalk,2.8).t(195,310,'Browser',{size:32,a:'middle'});
  b.p(rect(80,350,230,70),C.chalk,2.8).t(195,395,'client app',{size:32,a:'middle'});
  b.p(rect(80,435,230,70),C.chalk,2.8).t(195,480,'curl',{size:32,a:'middle',f:'l'});
  b.p(poly([[322,270],[336,270],[336,500],[322,500]],false,.6),C.dim,2.2).w(200);
  b.p(arrow(345,360,575,360,2,18),C.chalk,3).t(452,342,'request',{size:28,a:'middle',f:'l'});
  b.p(arrow(575,420,345,420,2,18),C.chalk,3).t(452,455,'response',{size:28,a:'middle',f:'l'}).w(200);
  // mikup, containing the connector and the resource handler
  b.p(dashRect(545,255,985,255),C.red,3);
  b.t(570,292,'Mikup',{size:36,c:C.red,wt:700}).w(150);
  b.p(rect(585,315,270,160),C.org,3.5);
  b.t(720,385,'HTTP Connector',{size:34,a:'middle',c:C.org,wt:700});
  b.t(720,425,'a pluggable module',{size:26,a:'middle',f:'l',c:C.dim}).w(200);
  b.p(arrow(870,365,1095,365,2,18),C.chalk,3).t(982,347,'FQN [payload]',{size:26,a:'middle',f:'l'});
  b.p(arrow(1095,425,870,425,2,18),C.chalk,3).t(982,460,'MKO / Stream',{size:26,a:'middle',f:'l'}).w(200);
  b.p(rect(1110,315,390,160),C.chalk,3);
  b.t(1305,378,'Resource Handler',{size:38,a:'middle',wt:700});
  b.p(ell(1240,435,30,16),C.yel,2.5).p(ell(1305,435,30,16),C.yel,2.5).p(ell(1370,435,30,16),C.yel,2.5).w(250);
  // terminal
  b.p(rect(80,545,1440,250,2),C.chalk,3);
  b.p(line(80,585,1520,585,1),C.dim,1.5);
  b.p(ell(108,565,7,7),C.red,2).p(ell(133,565,7,7),C.yel,2).p(ell(158,565,7,7),C.grn,2);
  b.t(1495,574,'the same Resources, over HTTP',{size:24,a:'end',f:'l',c:C.dim}).w(150);
  const S=26, X=110, H='"http://localhost:8888/';
  code(b,X,632,[['curl -v',C.chalk],[' -XPOST',C.cy],[' '+H,C.dim],['auth/login"',C.yel]],S); b.w(150);
  code(b,X,677,[['curl -v',C.chalk],[' -XGET',C.cy],[' '+H,C.dim],['asset/images/foto_01"',C.yel],[" -H 'Authorization: Bearer SDFKRKSUJTLYKEÒLRKÒLTÒLEJQIUER'",C.dim]],S); b.w(150);
  code(b,X,722,[['curl -v',C.chalk],[' -XPOST',C.cy],[' '+H,C.dim],['query/mgv001@main/v2.json"',C.yel]],S); b.w(150);
  code(b,X,767,[['curl -v',C.chalk],[' -XPOST',C.cy],[' '+H,C.dim],['commands/invoices/print"',C.yel]],S);
},
/* 15 · coming next: MKO */
b => {
  head2(b,'Coming next','MKO, the Mikup Object','a unified data model, with instances in memory');
  // 1 · scalar or structured
  b.p(rect(380,272,200,58),C.yel,3.5).t(480,312,'Object',{size:36,a:'middle',c:C.yel,wt:700});
  b.p(line(445,332,280,388,2),C.chalk,2.5).p(line(515,332,690,388,2),C.chalk,2.5);
  b.p(rect(140,390,260,88),C.chalk,3);
  b.t(270,428,'scalar',{size:32,a:'middle',wt:700});
  b.t(270,460,'a subtype of a primitive',{size:22,a:'middle',f:'l',c:C.dim});
  b.p(rect(560,390,280,88),C.chalk,3);
  b.t(700,428,'structured',{size:32,a:'middle',wt:700});
  b.t(700,460,'a subtype of Obj',{size:22,a:'middle',f:'l',c:C.dim}).w(250);
  // 2 · the schema: attrs + props
  b.p(line(700,480,700,518,1),C.chalk,2.5);
  b.p(dashRect(500,520,420,230),C.cy,3);
  b.t(518,553,'schema',{size:26,f:'l',c:C.cy});
  b.t(518,603,'attrs',{size:28,c:C.yel,wt:700});
  [610,715,820].forEach(x => {
    b.p(rect(x,572,90,44,1),C.chalk,2.6).t(x+45,602,'attr',{size:24,a:'middle',f:'l'});
    b.t(x+45,640,'+ props',{size:18,a:'middle',f:'l',c:C.grn});
  });
  b.w(200);
  b.t(518,700,'props',{size:28,c:C.grn,wt:700});
  b.t(610,692,'one value for every instance,',{size:22,f:'l'});
  b.t(610,718,'stored in the schema itself',{size:22,f:'l',c:C.dim}).w(250);
  // 3 · every attr is an Object, without limit
  b.p(poly([[912,594],[965,594],[965,301]],false,1),C.yel,2.6).p(arrow(965,301,590,301,1,16),C.yel,2.6);
  b.t(978,430,'every attr',{size:24,f:'l',c:C.yel});
  b.t(978,456,'is an Object',{size:24,f:'l',c:C.yel});
  b.t(978,482,'… no limit',{size:22,f:'l',c:C.dim}).w(250);
  // instances
  b.p(cyl(185,568,70,52),C.chalk,2.8);
  b.p(arrow(268,598,494,598,2,16),C.chalk,2.6).t(380,585,'instances',{size:24,a:'middle',f:'l'});
  b.t(220,660,'taken from outside',{size:24,a:'middle',f:'l'});
  b.t(220,688,'(e.g. a database)',{size:22,a:'middle',f:'l',c:C.dim});
  b.t(220,730,'or embedded as data',{size:22,a:'middle',f:'l',c:C.dim}).w(250);
  b.p(line(1090,280,1090,790,3),C.dim,2);
  // 5 · in memory, enveloped as a Resource
  b.p(rect(1270,285,110,80),C.yel,3);
  [305,325,345].forEach(y => b.p(line(1256,y,1268,y,.3),C.yel,2).p(line(1382,y,1394,y,.3),C.yel,2));
  b.t(1325,336,'MKO',{size:30,a:'middle',c:C.yel,wt:700});
  b.t(1325,397,'lives in memory',{size:24,a:'middle',f:'l'}).w(200);
  b.p(arrow(1325,410,1325,468,1,16),C.chalk,2.8);
  b.p(rect(1150,478,350,230),C.red,3.5);
  b.p(poly([[1150,478],[1325,585],[1500,478]],false,1),C.red,3);
  b.t(1325,628,'Resource',{size:34,a:'middle',c:C.red,wt:700});
  b.t(1325,662,'ownership, permissions,',{size:24,a:'middle',f:'l'});
  b.t(1325,690,'metadata',{size:24,a:'middle',f:'l'}).w(200);
  b.t(1325,748,'addressed and acquired',{size:26,a:'middle',f:'l'});
  b.t(1325,778,'in a Resource envelope',{size:26,a:'middle',f:'l',c:C.dim});
}
];
const titles = ['First-class citizen','Two ways to understand it','Anatomy','Metadata','Content','Three verbs','Qualify','Persist','Process','Domain scripting','Other Resources','At a glance','Where is the Web','HTTP in practice','Coming next: MKO'];
const sceneIds = [
  'first-class-citizen',
  'two-ways-to-understand-it',
  'anatomy',
  'metadata',
  'content',
  'three-verbs',
  'qualify',
  'persist',
  'process',
  'domain-scripting',
  'other-resources',
  'at-a-glance',
  'where-is-the-web',
  'http-in-practice',
  'coming-next-mko',
];




export default { id: 'resource', title: 'Resource: the first-class citizen', scenes: scenes.map((render, index) => ({ id: 'resource/' + sceneIds[index], title: titles[index], render })) };
