const height = 60;
const hole_r = 45;
const hole_d = 40;
const inner_height = height-hole_d;
const small_section_r = hole_r + 5;
const large_section_r = small_section_r + 2;

const quality = 4;

const fn = 16 * quality;

const w = 10;
function main() {
    const start = Date.now();
    const model = render();
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
     return union(
          difference(
        union(
          cylinder({r:small_section_r, h:height, fn:16}),
          translate([0,0,height/2],cylinder({r1: large_section_r, r2: small_section_r, h: 4, fn:16})),
         cylinder({r:large_section_r, h:height/2, fn:16})
          ),
         hole()
         ),
         flanges()
        );
 
}

function hole() {
  return translate([0,0,inner_height],intersection( 
    cylinder({r:hole_r, h:hole_d, fn}),
    translate([-hole_r,-hole_r,0],cube([hole_r*2,hole_r+hole_r/2,hole_d]))   
  ));
}

function connector() {
return    union(
    translate([0,-ht*2,0], hollowOut(intersection(hump(), translate([10.5,2,0],cube([hw-21,ht-2,hh]))),1,0,1))
  ,translate([7.5,-ht-ht/2,hh/2],difference(rotate([0,90,0],cylinder({r: 4.5, h: 65, fn})),translate([3,-5,-5],cube([58,10,10]))))
  
  );
}


function flanges() {
   return translate([0,0,inner_height], difference(
  translate([-33,-36,0],cube([66,72,30])),
translate([-33,-12,18],rotate([0,90,0],cylinder({r: 5, h: 66, fn}))),
translate([-31,-17,18],cube([62,10,12])),
translate([-30,-40,0],cube([60,80,60])),
translate([7,45,30],rotate([0,90,0],cylinder({r: 5, h: 66, fn})))         
   ));
}

function support() {
    return difference( hump(), translate([10,0,0],cube([hw-20,ht,hh])));
}



