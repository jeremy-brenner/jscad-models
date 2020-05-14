
const threadShape = [
    [0,0],
    [0,1],
    [0.45,0.55],
    [0.45,0.45]
];

const tsl = threadShape.length;

const threadPolys = seq(tsl).flatMap( i => [
  [ i, i+tsl, (i+1)%tsl+tsl ],
  [ (i+1)%tsl+tsl, (i+1)%tsl, i ]
]);


function getParameterDefinitions() {
  return [
      { name: 'p', type: 'number', initial: 1.3, caption: "Thread Pitch:", step: 0.1 },
      { name: 'r', type: 'int', initial: 3, caption: "Thread Radius:" },
      { name: 'showBolt', type: 'checkbox', checked: true, caption: 'Show Bolt:' },
      { name: 'h', type: 'int', initial: 15, caption: "Bolt Length:" },
      { name: 'hh', type: 'int', initial: 3, caption: "Bold Head Thickness:" },
      { name: 'hr', type: 'int', initial: 6, caption: "Bold Head Radius:" },
      { name: 'showNut', type: 'checkbox', checked: true, caption: 'Show Nut:' },
      { name: 'nh', type: 'int', initial: 3, caption: "Nut Thickness:" },
      { name: 'nr', type: 'int', initial: 6, caption: "Nut Radius:" },
      { name: 'rDiff', type: 'number', initial: 0.2, caption: "Looseness:", step: 0.1}
      
  ];
}

function main({p,r,showBolt,h,hh,hr,showNut,nh,nr,rDiff}) {
    const fn = 32;
    const models = [];
    if(showNut) {
      models.push(
        translate([nr+1,0,0],
          nut({tr:r+rDiff,nr,h:nh,fn,p})
        )
      );
    }
    if(showBolt) {
      models.push(
        translate([-hr-1,0,0],
          bolt({tr:r,hr,hh,th:h,fn,p})
        )
      );
    }

    return union(models);
}
  
function nut({tr,nr,h,p=1,fn=32}) {
  return union(
    difference(
      cylinder({r:nr,h,fn:6}),
      cylinder({r:tr+0.5*p,h,fn})
    ),
    thread({r:tr,h,fn,p,external:false})
  );
}

function bolt({tr,hr,hh,th,p=1,fn=32}) {
  return union(
    thread({r:tr,h:th,fn,p}),
    cylinder({r:tr,h:th,fn}),
    cylinder({r:hr,h:hh,fn:6})
  );
}

  function thread({r,h,fn,p=1, external = true}) {
    numSegments = (h+1)*fn;
    
    const points = seq(numSegments+1).flatMap( i => getThreadShape(r,360/fn*i,i/fn-1,external,p) );
    
    const segmentTriangles = seq(numSegments)
      .flatMap( i => threadPolys.map(poly => poly.map(x => x+i*threadShape.length)));
  
    const triangles = [ 
      seq(tsl), 
      ...segmentTriangles, 
      seq(tsl).map(i => points.length-(i+1))
    ];

    const _thread = polyhedron({points,triangles});
  
    return intersection(
      _thread,
      cylinder({r:r+0.5*p,h,fn})
    );
  }


  function getThreadShape(r,a,z,external,p) {
    const rad = a * Math.PI/180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    return ( external ? threadShape : threadShape.map(([x,y]) => [0.5-x,y]).reverse() )
    .map( d => [
        (r+d[0]*p) * cos,
        (r+d[0]*p) * sin,
        z*p+d[1]*p
    ])
  }
  
  function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
  }
  