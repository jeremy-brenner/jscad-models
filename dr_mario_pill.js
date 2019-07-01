const r = 1;
const cw = 2;

function endCap() {
  return rotate([90,0,0],sphere({r, fn: 50, center:true }));
}

function main () {

 return union( 
     translate([0,cw/2,0], endCap() ),
     rotate([90,0,0],cylinder({r, h: cw, fn: 50, center:true})),
     translate([0,-cw/2,0], endCap() )
     );
}
  