
getThreadShape = function(a,external=false) {
  const fh = 0.5*Math.tan((90-a)*Math.PI/180);

  const maxy = fh-fh/8;
  const maxx = maxy*1/Math.tan((90-a)*Math.PI/180);

  const miny = fh/4;
  const minx = miny*1/Math.tan((90-a)*Math.PI/180);

  return [ 
    [0,0],
    [0,1],
  //  [miny,1],
    [miny,1-minx],
    [maxy,1-maxx],
    [maxy,maxx],
    [miny,minx],
  //  [miny,0] 
  ];   
}

function getParameterDefinitions() {
  return [
      { name: 'a', type: 'number', initial: 30, caption: "Thread Angle:", step: 1 }
  ];
}

function main({a}) {
 
  const points = getThreadShape(a);
  return polygon({points});
}
