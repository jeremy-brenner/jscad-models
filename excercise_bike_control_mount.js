
const pw = 97;
const ph = 97;
const pt = 2;
const cr = 30;
const ch = 20;
const hd = 13;
 
function main () {
  return difference( 
    union(
      cube({size: [pw,ph,pt], center: false}),
      translate([pw/2,ph/2,0],cylinder({r: cr, h: ch}))
    ),
    translate([pw/2,ph/2,-5],cylinder({r: cr-5, h: ch})),
    translate([pw/2,ph/2,5],cylinder({r: cr-20, h: ch})),
    translate([pw/2+hd,ph/2+hd,0],cylinder({r: 2.5, h: ch})),
    translate([pw/2+-hd,ph/2+hd,0],cylinder({r: 2.5, h: ch})),
    translate([pw/2+-hd,ph/2+-hd,0],cylinder({r: 2.5, h: ch})),
    translate([pw/2+hd,ph/2+-hd,0],cylinder({r: 2.5, h: ch}))
  );
}