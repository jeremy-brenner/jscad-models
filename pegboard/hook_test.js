const hook_radius = 2;
const hook_curve_radius = 3;
const combined_radius = hook_radius + hook_curve_radius;
const hook_segment_length = 10;

function main () {
   //return cylinder({r:2,h:10})
   
   const elbow = translate([0,-hook_curve_radius,0],rotate([0,90,0],intersection([
    torus({ ri: hook_radius, ro: hook_curve_radius }),
    cube({size:[combined_radius,combined_radius,combined_radius], center:[false,false,true]})
    ])));
   const segment = union([
       translate([0,0,hook_segment_length],sphere({r:hook_radius})),
       cylinder({r:hook_radius,h:hook_segment_length})
       ]);
   const hook = union([elbow,segment, translate([0,-hook_curve_radius,-hook_curve_radius],rotate([90,0,0], segment))]);

   return union([
       hook,
       translate([25,0,0],hook),
       translate([-5,-17,-8],cube({size:[35,4,10]}))
       ]);

}
