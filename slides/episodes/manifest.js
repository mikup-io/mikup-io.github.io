import { C, cyl, gear, globe, lock, monitor, star4 } from '../runtime/drawing.js';

export default {
  id: 'manifest',
  title: 'Manifest',
  scenes: [{
    id: 'manifest/intro',
    title: 'Manifest',
    render: b => {
      b.t(800,330,'Mikup',{size:170,c:C.yel,a:'middle',wt:700,u:C.yel}).w(250);
      b.t(800,475,'One grammar. Any resource. Any app.',{size:74,a:'middle',wt:600}).w(300);
      b.t(800,550,'From a single microservice to a full monolith: one way to build them all.',{size:34,a:'middle',f:'l',c:C.dim}).w(250);
      b.p(cyl(420,690,60,50),C.dim,2.5);
      b.p(monitor(550,688,80,48),C.dim,2.5);
      b.p(gear(730,712,30,8),C.dim,2.5);
      b.p(lock(870,697,.45),C.dim,2.5);
      b.p(globe(1010,712,32),C.dim,2.5);
      b.p(star4(1150,712,32),C.dim,2.5);
    },
  }],
};
