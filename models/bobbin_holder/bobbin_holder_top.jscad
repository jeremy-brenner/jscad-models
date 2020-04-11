
function main() {
  return difference( 
      disk(),
      union([...Array(6).keys()].map(i => radialTranslate(i*60,28.5,hole()) ))
      );
}

function hole() {
return cylinder({h:10, d:4});
}

function disk() {
return union(
  cylinder({h:3, d:65, fn:64}),
  cylinder({h:9, d:6})
  );
}

function radialTranslate(angle,distance,obj) {
  const rad = angle * Math.PI/180;
  const x = distance*Math.cos(rad);
  const y = distance*Math.sin(rad);
  return translate([x,y,0],rotate([0,0,angle],obj));
}

