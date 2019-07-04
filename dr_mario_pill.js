const fn = 20;
const r = 0.5;

function main () {
  return union( 
    sphere({r, fn, center:true }),
    translate([0,0,r/2],cylinder({r, h: r, fn, center:true}))
  );
}