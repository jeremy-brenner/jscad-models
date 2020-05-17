include("../lib/thread_shape.jscad");

function polyToTri(points) {
  return points.slice(1,-1).map( (v,i) => [points[0],v,points[i+2]] );
}

function getTriangles(threadShape,numSegments) {
  const tsl = threadShape.length;
  const pc = (numSegments+1) * tsl;
  const threadPolys = seq(tsl).map( i => [ i, i+tsl, (i+1)%tsl+tsl, (i+1)%tsl ] );
  const polys = [
    seq(tsl),
    ...seq(numSegments).flatMap( i => threadPolys.map(poly => poly.map(x => x+i*tsl))),
    seq(tsl).map(i => pc-(i+1))
  ]
  
  return polys.flatMap(p => polyToTri(p));
}

threads = function({r, h, fn=32, p=1, external=true}) {

  const threadShape = getThreadShape(30);
  numSegments = (h+1)*fn;
  const triangles = getTriangles(threadShape,numSegments);
  
  const points = seq(numSegments+1).flatMap( i => getPoints(r,360/fn*i,i/fn-1,external,p,threadShape) );

  const _thread = polyhedron({points,triangles});

  return intersection(
    _thread,
    cylinder({r:r*2,h,fn})
  );
}


function getPoints(r,a,z,external,p,threadShape) {
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
  