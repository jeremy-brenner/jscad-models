
const pw = 7.4;
const ph = 18;
const ww = 0.8;
const cx = 5;
const cy = 2;

function seq(num) {
  return [...Array(num).keys()];
}

function cavities() {
  return seq(cy).map( (y) => {
    return seq(cx).map( (x) => {
      return translate([x*(pw + ww)+ww,y*(pw+ww)+ww,ww],cube({size: [pw, pw, ph], center: false}))
    });
  }).flat();
}
      
function holes() {
  return seq(cy).map( (y) => {
    return seq(cx).map( (x) => {
      return translate([x*(pw+ww)+pw/2+ww*2,y*(pw+ww)+pw/2+ww*2,ww],cylinder({r: pw/2.2, h: 10, center: false}))
    });
  }).flat();
}

function box() {
  return difference( 
    cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false}),
    ...cavities()
  ); 
 }
 
 function lid() {
  return difference(
      cube({size: [(pw+ww)*cx+ww*3,(pw+ww)*cy+ww*3,ph/4], center: false}),
      translate([ww,ww,ww*3],cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false})),
    translate([ww,ww,-ph+0.8],cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false})),
  ...holes()
  );
 }
 
function main () {
  return union(
    translate([0,30,0],box()),
    lid()
  );
}
  
  