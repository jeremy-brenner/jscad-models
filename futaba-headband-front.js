
//http://www.craftsmanspace.com/sites/default/files/free-patterns-download/eye_of_horus_symbol.svg

let w = 175;
let l = 205;
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

function band() {
 return difference( 
     union(
     oval(w+0.5,l+0.5,h),
     translate([0,0,h/2-h/12],oval(w+2.5,l+2.5,h/5.5)),
     translate([0,0,-h/2+h/12],oval(w+2.5,l+2.5,h/5.5))
     ),
     oval(w-t-0.5,l-t-0.5,h)  
      );
}

function main() {
    return difference(
          translate([0,l/2-2,-1],cube({size:[50,8,27],center: true})),
          band()
        );
}
