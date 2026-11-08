import { C, arrow, head2, line, meas, rect } from '../runtime/drawing.js';

const scenes = [
  b => {
    head2(b,'Mikup Object (MKO) vs. OOP Class','familiar concepts, broader reach','Mikup Objects extend object-oriented programming');
    b.t(175,330,'Obj',{size:42,c:C.red,wt:700});
    b.p(arrow(300,316,507,316,2,18),C.chalk,3);
    b.t(550,330,'Class',{size:42,c:C.yel,wt:700});

    const row = (y, left, right, color) => {
      b.t(235,y,left,{size:40,c:C.red,wt:700});
      b.p(arrow(405,y-14,507,y-14,2,16),C.chalk,3);
      b.t(550,y,right,{size:40,c:color,wt:700});
    };
    row(400,'Name','Class name',C.yel);
    row(455,'Description','Annotation',C.yel);
    row(510,'Type','Complete Class name',C.yel);
    b.t(940,510,'(with namespace/package)',{size:25,f:'l',c:C.chalk});
    row(565,'Attrs','Attributes',C.yel);
    b.t(850,565,'Obj collection',{size:33,c:C.cy,wt:700});
    b.t(1030,565,'(when: no type or type=Obj or type Obj sub types)',{size:25,f:'l',c:C.chalk});
    row(620,'Props','Annotations',C.yel);
    b.t(850,620,'Obj collection',{size:33,c:C.cy,wt:700});

    b.t(800,720,'MKO is not OOP: objects describe data and their meaning',{size:38,a:'middle',c:C.cy,wt:700});
  },
  b => {
    head2(b,'Obj: the building block','one node, every level','a Mikup schema is built from Obj nodes');

    b.p(rect(70,325,730,400,2),C.yel,3.5);
    b.t(435,390,'Obj',{size:52,a:'middle',c:C.yel,wt:700});
    b.p(line(110,420,760,420,1),C.dim,2);
    [['name + description','identity and meaning'],['type','declared type'],['attrs','nested structure'],['props','associated properties']].forEach(([field,meaning],index) => {
      const y = 480 + index*65;
      b.t(110,y,field,{size:40,c:index===3?C.cy:C.chalk,wt:700});
      b.t(765,y,meaning,{size:30,a:'end',f:'l',c:C.dim});
    });

    b.p(arrow(830,520,940,520,2,18),C.chalk,3);
    b.t(1000,440,'Root schema',{size:40,c:C.yel,wt:700});
    b.t(1000,500,'or',{size:31,f:'l',c:C.dim});
    b.t(1000,560,'any attribute',{size:40,c:C.yel,wt:700});
    b.t(1000,620,'or props',{size:40,c:C.cy,wt:700});
    b.t(1000,685,'All are Obj nodes.',{size:32,f:'l'});
    b.t(800,835,'The same building block is used at every level.',{size:37,a:'middle',f:'l',c:C.cy,wt:700});
  },
  b => {
    head2(b,'Attributes build structure','Obj nodes can contain Obj nodes','nested attrs describe data at varying depths');

    b.p(rect(130,350,280,95,2),C.yel,3);
    b.t(270,410,'Person',{size:40,a:'middle',c:C.yel,wt:700});
    b.p(line(410,397,490,397,1),C.chalk,2.5);
    b.p(line(490,397,490,700,1),C.chalk,2.5);
    [[470,'name'],[565,'address'],[660,'contacts']].forEach(([y,label]) => {
      b.p(line(490,y,555,y,1),C.chalk,2.5);
      b.t(575,y+10,label,{size:36,c:C.chalk,wt:700});
    });
    b.p(line(780,555,865,555,1),C.chalk,2.5);
    b.p(line(865,515,865,600,1),C.chalk,2.5);
    b.p(line(865,515,920,515,1),C.chalk,2.5);
    b.p(line(865,600,920,600,1),C.chalk,2.5);
    b.t(940,525,'street',{size:34,c:C.cy});
    b.t(940,610,'city',{size:34,c:C.cy});
    b.p(line(780,660,1110,660,1),C.chalk,2.5);
    b.p(line(1110,620,1110,705,1),C.chalk,2.5);
    b.p(line(1110,620,1165,620,1),C.chalk,2.5);
    b.p(line(1110,705,1165,705,1),C.chalk,2.5);
    b.t(1185,630,'email',{size:34,c:C.grn});
    b.t(1185,715,'phone',{size:34,c:C.grn});
    b.t(800,835,'A hierarchy of nodes and relationships: a tree.',{size:37,a:'middle',f:'l',c:C.cy,wt:700});
  },
  b => {
    head2(b,'Props: information on the schema','properties at every level','props carry both a schema and associated values');

    b.p(rect(125,330,650,425,2),C.yel,3);
    const rows = [
      [395,170,'Person','object props'],
      [485,200,'name','attribute props'],
      [575,200,'address','attribute props'],
      [665,230,'city','nested attribute props'],
    ];
    rows.forEach(([y,x,label,annotation]) => {
      b.t(x,y,label,{size:35,f:'l',c:C.chalk});
      b.p(arrow(410,y-12,470,y-12,1,12),C.cy,2);
      b.t(490,y,annotation,{size:28,f:'l',c:C.cy});
    });

    b.t(860,395,'Each props object has',{size:34,c:C.yel,wt:700});
    b.t(860,455,'a structure + values',{size:38,c:C.cy,wt:700});
    b.t(860,545,'Properties can guide behavior',{size:31,f:'l'});
    b.t(860,590,'or interpretation of data.',{size:31,f:'l'});
    b.t(860,675,'Their meaning depends on',{size:29,f:'l',c:C.dim});
    b.t(860,715,'the component that reads them.',{size:29,f:'l',c:C.dim});
    b.t(800,835,'Props belong to the schema, but carry values too.',{size:37,a:'middle',f:'l',c:C.cy,wt:700});
  },
  b => {
    head2(b,'From schema to data','structure, properties and values','serialization is a representation, not the model');

    b.p(rect(120,365,380,250,2),C.yel,3.5);
    b.t(310,425,'Obj',{size:48,a:'middle',c:C.yel,wt:700});
    b.t(310,485,'structure + props',{size:31,a:'middle',f:'l'});
    b.t(310,550,'the shared schema',{size:28,a:'middle',f:'l',c:C.dim});
    b.p(arrow(525,490,645,490,2,18),C.chalk,3);
    b.p(rect(670,325,380,155,2),C.cy,3);
    b.t(860,385,'OValue',{size:40,a:'middle',c:C.cy,wt:700});
    b.t(860,435,'one instance',{size:30,a:'middle',f:'l'});
    b.p(rect(670,525,380,155,2),C.grn,3);
    b.t(860,585,'OVList',{size:40,a:'middle',c:C.grn,wt:700});
    b.t(860,635,'many instances',{size:30,a:'middle',f:'l'});
    b.p(arrow(1075,490,1190,490,2,18),C.chalk,3);
    b.p(rect(1215,365,270,250,2),C.chalk,3);
    b.t(1350,425,'JSON',{size:40,a:'middle',wt:700});
    b.t(1350,485,'or',{size:28,a:'middle',f:'l',c:C.dim});
    b.t(1350,545,'YAML',{size:40,a:'middle',wt:700});
    b.t(1350,590,'shared serialization',{size:24,a:'middle',f:'l',c:C.dim});
    b.t(800,815,'The model describes the data; serialization represents it for exchange.',{size:34,a:'middle',f:'l',c:C.cy,wt:700});
  },
  b => {
    head2(b,'Serialization','every Mikup Object can be represented as a string','the same data, different textual representations');

    const panel = (x, width, title, lines, size = 20, spacing = 30, highlight = false) => {
      b.p(rect(x,310,width,490,2),highlight ? C.org : C.chalk,highlight ? 4 : 2.5,{blink:highlight});
      b.t(x+20,355,title,{size:36,c:C.yel,wt:700});
      lines.forEach(([text, color], i) => {
        const indent = text.length - text.trimStart().length;
        const content = text.trimStart();
        const key = title === 'JSON Document' && content.match(/^"(?:name|surname|birthday|height)"/);
        const tx = x+20+indent*6, y = 390+i*spacing;
        if(key){
          b.t(tx,y,key[0],{size,f:'m',wt:600,c:C.cy});
          b.t(tx+meas(key[0],size,'m',600),y,content.slice(key[0].length),{size,f:'m',wt:600,c:C.chalk});
        } else {
          b.t(tx,y,content,{size,f:'m',wt:600,c:color || C.chalk});
        }
      });
      b.w(150);
    };
    panel(45,400,'CSV',[
      ['name,surname,birthday,height',C.cy],
      ['Mario,Rossi,1985-05-12,178'],
      ['Giulia,Bianchi,1990-11-30,165'],
      ['Luca,Verdi,1978-03-22,182'],
    ]);
    panel(485,430,'JSON Document',[
      ['['],
      ['  {'],
      ['    "name": "Mario",'],
      ['    "surname": "Rossi",'],
      ['    "birthday": "1985-05-12",'],
      ['    "height": 178'],
      ['  },'],
      ['  {'],
      ['    "name": "Giulia",'],
      ['    "surname": "Bianchi",'],
      ['    "birthday": "1990-11-30",'],
      ['    "height": 165'],
      ['  },'],
      ['  {'],
      ['    "name": "Luca",'],
      ['    "surname": "Verdi",'],
      ['    "birthday": "1978-03-22",'],
      ['    "height": 182'],
      ['  }'],
      [']'],
    ],20,20);
    panel(955,600,'Mikup ( JSON )',[
      ['{'],
      ['  "name": "person",',C.cy],
      ['  "attrs": [',C.cy],
      ['    { "name": "name" },',C.cy],
      ['    { "name": "surname" },',C.cy],
      ['    { "name": "birthday", "type": "Date" },',C.cy],
      ['    { "name": "height", "type": "Integer" }',C.cy],
      ['  ],',C.cy],
      ['  "values": [',C.grn],
      ['    ["Mario", "Rossi", "1985-05-12", 178],',C.grn],
      ['    ["Giulia", "Bianchi", "1990-11-30", 165],',C.grn],
      ['    ["Luca", "Verdi", "1978-03-22", 182]',C.grn],
      ['  ]',C.grn],
      ['}'],
    ],21,22,true);
    b.t(800,835,'One text representation carries the schema and its values.',{size:36,a:'middle',f:'l',c:C.cy,wt:700});
  },
];

export default {
  id: 'objects',
  title: 'MKO, the Mikup Object',
  scenes: [
    { id: 'objects/node', title: 'Obj: the building block', render: scenes[1] },
    { id: 'objects/structure', title: 'Attributes build structure', render: scenes[2] },
    { id: 'objects/properties', title: 'Props: information on the schema', render: scenes[3] },
    { id: 'objects/values-and-serialization', title: 'From schema to data', render: scenes[4] },
    { id: 'objects/oop-comparison', title: 'A comparison between MKO and OOP', render: scenes[0] },
    { id: 'objects/string-serialization', title: 'Every Mikup Object as a string', render: scenes[5] },
  ],
};
