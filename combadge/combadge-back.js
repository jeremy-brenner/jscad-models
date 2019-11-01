function main() {
  return    difference(
  union(
      translate([-10,-6,0],cube([20,12,3.5])),
      translate([10,0,0],cylinder({ r:6, h: 3.5})),
      translate([-10,0,0],cylinder({ r:6, h: 3.5}))
  ),
      translate([10,0,0],cylinder({ r:4, h: 2.5})),
      translate([-10,0,0],cylinder({ r:4, h: 2.5}))
      );
}