const r=6;

function main() {
  return    difference(
  union(
      translate([-10,-6,0],cube([20,12,3.5])),
      translate([10,0,0],cylinder({ r:r+2, h: 3.5})),
      translate([-10,0,0],cylinder({ r:r+2, h: 3.5}))
  ),
      translate([10,0,0],cylinder({ r, h: 2.5})),
      translate([-10,0,0],cylinder({ r, h: 2.5}))
      );
}