// include("../lib/thread_shape.jscad");
// const otherThreadShape = getThreadShape(30);
// // console.log(otherThreadShape)
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

const threadTriangles = seq(tsl).flatMap( i =>  polyToTri([ i, i+tsl, (i+1)%tsl+tsl, (i+1)%tsl ]) )

function polyToTri(points) {
  return points.slice(1,-1).map( (v,i) => [points[0],v,points[i+2]] );
}

threads = function({r, h, fn=32, p=1, external=true}) {

  numSegments = (h+1)*fn;
  
  const points = seq(numSegments+1).flatMap( i => getPoints(r,360/fn*i,i/fn-1,external,p) );
  
  const segmentTriangles = seq(numSegments)
    .flatMap( i => threadTriangles.map(poly => poly.map(x => x+i*threadShape.length)));

  const triangles = [ 
    ...polyToTri(seq(tsl)), 
    ...segmentTriangles, 
    ...polyToTri( seq(tsl).map(i => points.length-(i+1)) )
  ];

  const _thread = polyhedron({points,triangles});

  return intersection(
    _thread,
    cylinder({r:r+0.5*p,h,fn})
  );
}


function getPoints(r,a,z,external,p) {
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
  