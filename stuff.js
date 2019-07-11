
function main () {
  return difference( 
    cube({size: [9.5,9.5,0.2], center: true}),
    translate([3.25,3.25,0],cylinder({r: 0.25, h: 10, center: true})),
    translate([-3.25,3.25,0],cylinder({r: 0.25, h: 10, center: true})),
    translate([3.25,-3.25,0],cylinder({r: 0.25, h: 10, center: true})),
    translate([-3.25,-3.25,0],cylinder({r: 0.25, h: 10, center: true}))
  ); 
}
  
