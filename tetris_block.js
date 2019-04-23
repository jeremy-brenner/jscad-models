
function block() {
  return  difference(
    cube({size: [10,10,1], center: [true, true, false]}),
    bevel(),
    bevel().rotateZ(90),
    bevel().rotateZ(180),
    bevel().rotateZ(-90)
  );
}

function bevel() {
  return cube({size: [5,10,5], center: [true, true, false]})
  .rotateY(20)
  .translate([5,0,0.5]);
}

function main () {
  return block();
}

