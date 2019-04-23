
let w = 155;
let l = 200;
let h = 25;
let t = 5;
let resolution = 128;


function cyl(w,h) {
    return CSG.cylinder({                      //using the CSG primitives
  start: [0, 0, h/2],
  end: [0,0 , -h/2],
  radius: w/2,                        // true cylinder
  resolution
});
}

function oval(w,l,h) {
    let o =  l - w;
     return union(
      translate([0,o/2,0],cyl(w,h)),
      cube({size:[w, o, h],center: true}),
      translate([0,o/-2,0],cyl(w,h))
     );
}

function main () {
 return difference( 
     union(
     oval(w,l,h),
     translate([0,0,h/2-h/12],oval(w+2,l+2,h/6)),
     translate([0,0,-h/2+h/12],oval(w+2,l+2,h/6))
     ),
     oval(w-t,l-t,h)  
      );
}
