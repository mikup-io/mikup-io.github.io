import { C, arrow, cyl, dashRect, line, poly, rect, head2 } from '../runtime/drawing.js';

const scenes = [
  b => {
    head2(b,'Coming next','MKO, the Mikup Object','a unified data model, with instances in memory');
    b.p(rect(380,272,200,58),C.yel,3.5).t(480,312,'Object',{size:36,a:'middle',c:C.yel,wt:700});
    b.p(line(445,332,280,388,2),C.chalk,2.5).p(line(515,332,690,388,2),C.chalk,2.5);
    b.p(rect(140,390,260,88),C.chalk,3);
    b.t(270,428,'scalar',{size:32,a:'middle',wt:700});
    b.t(270,460,'a subtype of a primitive',{size:22,a:'middle',f:'l',c:C.dim});
    b.p(rect(560,390,280,88),C.chalk,3);
    b.t(700,428,'structured',{size:32,a:'middle',wt:700});
    b.t(700,460,'a subtype of Obj',{size:22,a:'middle',f:'l',c:C.dim}).w(250);
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
    b.p(poly([[912,594],[965,594],[965,301]],false,1),C.yel,2.6).p(arrow(965,301,590,301,1,16),C.yel,2.6);
    b.t(978,430,'every attr',{size:24,f:'l',c:C.yel});
    b.t(978,456,'is an Object',{size:24,f:'l',c:C.yel});
    b.t(978,482,'… no limit',{size:22,f:'l',c:C.dim}).w(250);
    b.p(cyl(185,568,70,52),C.chalk,2.8);
    b.p(arrow(268,598,494,598,2,16),C.chalk,2.6).t(380,585,'instances',{size:24,a:'middle',f:'l'});
    b.t(220,660,'taken from outside',{size:24,a:'middle',f:'l'});
    b.t(220,688,'(e.g. a database)',{size:22,a:'middle',f:'l',c:C.dim});
    b.t(220,730,'or embedded as data',{size:22,a:'middle',f:'l',c:C.dim}).w(250);
    b.p(line(1090,280,1090,790,3),C.dim,2);
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
  },
];

export default {
  id: 'ep_02',
  title: 'MKO, the Mikup Object',
  scenes: [{ id: 'ep_02/mko-the-mikup-object', title: 'MKO, the Mikup Object', render: scenes[0] }],
};
