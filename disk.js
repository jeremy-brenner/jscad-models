
const quality = 1;

const fn = 16 * quality;


function main() {
    const start = Date.now();
    const model = render();
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    return union( 
       disk({ri:5,ro:20,fni:fn,fno:fn*2})
    );
}


function disk({ri,ro,fni,fno}) {
  return union(
      torus({ ri, ro, fni, fno }),
      translate([0,0,-ri],cylinder({r:ro,h:ri*2,fn:fno}))
      );
}