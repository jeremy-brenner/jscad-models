
const pw = 7.6;
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
      return translate([x*(pw+ww)+pw/2+ww*2,y*(pw+ww)+pw/2+ww*2,ww],cylinder({r: pw/2*0.85, h: 10, center: false}))
    });
  }).flat();
}

function windows() {
    return seq(cx).map( (x) => {
      return translate([x*(pw + ww)+ww*2,-ww*4,ww*2],cube({size: [pw-ww*2,((pw+ww)*cy+ww*8),ph-ww*2], fn: 20, radius: (pw-ww*2)/2, round: true, center: false}));
    });
}

function box() {
  return difference( 
    cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false}),
    ...cavities(),
    ...windows()
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
    translate([0,(pw+ww)*cy+ww*5,0],box()),
    lid()
  );
}