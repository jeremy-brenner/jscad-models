const r = 0.5;

function main () {

 return union( 
     rotate([90,0,0],sphere({r: r, fn: 50, center:true })),
     translate([0,r/2,0],rotate([90,0,0],cylinder({r: r, h: r, fn: 50, center:true})))
     );
}