include("../threads/thread_shape.jscad");

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

threads = function({r, h, a=90, fn=32, p=1, l=1, external=true}) {

  const threadShape = getThreadShape(a,external);
  
  numSegments = Math.ceil( (h/p/l+1)*fn);
  const triangles = getTriangles(threadShape,numSegments);
  
  const points = seq(numSegments+1).flatMap( i => getPoints(r,360/fn*i,i/fn-0.5,p,l,threadShape) );

  const _thread = polyhedron({points,triangles});
  const _allThreads = l==1 ? _thread : union(seq(l).map(i => rotate([0,0,i*360/l],_thread)));

  const maxR = getFundamentalTriangleH(a)*p/2+r;
  const minR = getFundamentalTriangleH(a)*p/-2+r;
  const boundingBox = cube({size:[maxR*2,maxR*2,h], center:[true,true,false]});

  const obj = intersection(_allThreads,boundingBox);

  obj.properties.maxR = maxR;
  obj.properties.minR = minR;
  return obj;
}


function getPoints(r,a,z,p,l,threadShape) {
  const rad = a * Math.PI/180;
  return threadShape
    .map( d => [
        (r+d[0]*p) * Math.cos(rad),
        (r+d[0]*p) * Math.sin(rad),
        z*p*l+d[1]*p
    ])
}

function seq(length) {
  return Array.apply(null, {length}).map(Function.call, Number);
}
  