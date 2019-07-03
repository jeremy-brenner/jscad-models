const fn = 20;
const r = 0.5;

function main () {

  return union( 
    rotate(
      [90,0,0],
      sphere({r, fn, center:true })
    ),
    translate(
      [0,r/2,0],
      rotate(
        [90,0,0],
        cylinder({r, h: r, fn, center:true})
      )
    )
  );
}
  
