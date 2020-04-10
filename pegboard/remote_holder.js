
const hook_radius = 2;
const hook_curve_radius = 3;
const combined_radius = hook_radius + hook_curve_radius;
const hook_segment_length = 10;

function main () {

   const elbow = translate([0,-hook_curve_radius,0],rotate([0,90,0],intersection([
    torus({ ri: hook_radius, ro: hook_curve_radius }),
    cube({size:[combined_radius,combined_radius,combined_radius], center:[false,false,true]})
    ])));
   const segment = union([
       translate([0,0,hook_segment_length],sphere({r:hook_radius})),
       cylinder({r:hook_radius,h:hook_segment_length})
       ]);
   const hook = union([elbow,segment, translate([0,-hook_curve_radius,-hook_curve_radius],rotate([90,0,0], segment))]);

   const backing = union([
       cube({size:[54,2,80], center:[true,true,false]}),
       rotate([90,0,0],cylinder({r:27,h:2, center:true}))
       ]);

   const holder = difference([
       union([
       intersection([
           difference([
             sphere({r:27, center:true}),
             sphere({r:25, center:true})
           ]),
           cube({size:[100,100,-100], center:[true,false,false]})
        ]),
        intersection([
           difference([
             cylinder({r:27,h:80}),
             cylinder({r:25,h:80})
            ]),
           cube({size:[100,100,100], center:[true,false,false]})
        ])
      ]),
      cube({size:[30,100,100], center:[true,false,false]}),
      rotate([90,0,0],cylinder({r:15,h:100, center:true}))
      
      
      ]);

   

   return union([
       hook,
       translate([25,0,0],hook),
       translate([12.5,-14,-80],rotate([0,0,180],union([backing,holder])))
       ]);

}
