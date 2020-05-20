
getFundamentalTriangleH = function(a) {
  return 0.5*Math.tan((90-a/2)*Math.PI/180);
}

getMajorRadiusH = function(a) {
  const fh = getFundamentalTriangleH(a);
  return fh*0.875;
}

getMinorRadiusH = function(a) {
  const fh = getFundamentalTriangleH(a);
  return fh*0.25;
}

function getThread(maxx,maxy,minx,miny,external) {
  return external ? 
    getExternalThread(maxx,maxy,minx,miny) : 
    getInternalThread(maxx,maxy,minx,miny);
}

function getExternalThread(maxx,maxy,minx,miny) {
  return [    
    [miny,1-minx],
    [maxy,1-maxx],
    [maxy,maxx],
    [miny,minx]
  ];
}

function getInternalThread(maxx,maxy,minx,miny) {
  return [
    [miny,0.5+minx],
    [maxy,0.5+maxx],
    [maxy,0.5-maxx],
    [miny,0.5-minx],
  ];
}

getThreadShape = function(a,external) {
  const fh = getFundamentalTriangleH(a);

  const maxy = external ? getMajorRadiusH(a) : fh;
  const maxx = maxy/(fh*2);

  const miny = external ? 0 : getMinorRadiusH(a);
  const minx = miny/(fh*2);

  const yOffset = fh/2;
  const xOffset = 0.5;

  return getThread(maxx,maxy,minx,miny,external).map(c => [c[0]-yOffset,c[1]-xOffset]);
}

function getParameterDefinitions() {
  return [
      { name: 'a', type: 'number', initial: 30, caption: "Thread Angle:", step: 1 },
      { name: 'external', type: 'checkbox', checked: false, caption: 'External:' },
  ];
}

function main({a,external}) {
  const points = getThreadShape(a,external);

  return linear_extrude({ height: 0.2 }, polygon({points})); 
}
