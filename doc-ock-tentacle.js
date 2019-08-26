
const hw = 8;
const ri = 8;
const ro = 4;

//const fni = 64;
//const fno = 64;
const fni = 16;
const fno = 16;

function main() {
  return difference( 
      humps(),
      translate([0,0.1,0], scale([0.97, 0.97,1 ], difference(
          humps(), 
          translate([10,-6,0],cube([3,5,40]))
          ))
      ));
}


function humps() {
     return union(
       hump(),
      translate([0,0,hw],hump()), 
      translate([0,0,hw*2],hump()),
      
     translate([0,-4,hw],rotate([90,0,0],torus({ ri: 2, ro: 5, fni: fni/2, fno }))),
      translate([0,-4,hw],rotate([90,0,0],torus({ ri: 2, ro: 2, fni: fni/2, fno })))


      );
}

function hump() {
    return difference(
               
        union(
        intersection(
            translate([-15,-5.5,-hw/2],cube([30,20,hw])),
            union(
                torus({ ri, ro, fni,fno }),
                translate([ro,0,0], rotate([90,0,0],cylinder({r: ri, h: 4, fn: fni}))),
                translate([-ro,0,0], rotate([90,0,0],cylinder({r: ri, h: 4, fn: fni}))),
                translate([ro,-4,0],rotate([90,0,0],torus({ ri:1.5 , ro: ri-1.5, fni: fni/2, fno: fni }))),
                translate([-ro,-4,0],rotate([90,0,0],torus({ ri:1.5 , ro: ri-1.5, fni: fni/2, fno: fni })))
            )
        )
      ),
      translate([20,-3.75,-ro+1.5],rotate([0,90,180],bevel())),
      translate([-20,-3.75,ro-1.5],rotate([0,270,180],bevel()))

   
      );
}

function bevel() {
    return difference(
             cube([2,2,40]),
         cylinder({r: 2, h: 40, fn: fno})
         );
}
