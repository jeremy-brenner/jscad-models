// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad

const thickness = 3;
const side_height = 20;
const len = 210;
const wid = 155;
const pole_radius = 22;
const screw_hole_radius = 2.5;
const screw_hole_separation = 189;
// 189 
function screwHole() {
    return rotate([0,90,0],
        cylinder({r: screw_hole_radius, h: thickness, center: [true, true, true] })
    );
}
function side() {
  return difference(
      cube({
        size: [thickness, len, side_height], 
        center: [true, true, false]
      }),
      screwHole().translate([0,screw_hole_separation/2,side_height/2]),
      screwHole().translate([0,screw_hole_separation/-2,side_height/2])
    );
}

function main () {
   return difference(
       union(
        cube({size: [wid, len, thickness], center: [true, true, false]}),
        cylinder({r: pole_radius+5, h: 50, center: [true, true, false] }),
        side().translate([wid/2,0,0]),
        side().translate([wid/-2,0,0])
       ),
       cylinder({r: pole_radius, h: 50, center: [true, true, false] }),
       cube({size: [100,50, 15], center: [true, true, false]})
         .translate([0,-65,0]),
       cube({size: [100,50, 15], center: [true, true, false]})
         .translate([0,65,0])
      );
      
     
      
      
    // cylinder()
//   return union(
//     difference(
//       cube({size: 3, center: [true,true,true]}),
//       sphere({r: 2, center: true})
//     ),
//     intersection(
//       sphere({r: 1.3, center: true}),
//       cube({size: 2.1, center: true})
//     )
//   ).translate([0, 0, 1.5]).scale(10);
}


//15.5 19 4