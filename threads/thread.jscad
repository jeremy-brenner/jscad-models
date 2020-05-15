include('../util/seq.jscad');

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


thread = function({r, h, fn, p=1, external=true}) {
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
  
