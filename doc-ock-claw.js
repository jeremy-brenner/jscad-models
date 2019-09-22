
const quality = 1;

const fn = 16 * quality;

const curveRadius = 35;
const segmentAngle = 14;
const sizeAngle = 8;
const segments = 12;

function main() {
    const start = Date.now();
    const model = render();
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    return union( 
        [...Array(segments).keys()].map( (i) => segment(i))
    );
}


function segment(i) {
  
   let sa = i*segmentAngle*(100-i*3.5)/100;
   let spos = multipliers(sa);
   let sm = multipliers(sizeAngle*i).y;
        const s = 20-i*sm*1.4;
     const hr = 6-i*sm*0.4;
     const cubeH = hr;
return translate([curveRadius*spos.x,0,-curveRadius*spos.y], 
    rotate([0,sa,0],
     translate([-s+hr/2,0,0],intersection(
             torus({ ri: hr, ro: s, fni: fn / 2, fno: fn }),
             translate([s-(cubeH-hr),-s-hr,-hr],cube([cubeH,(s+hr)*2,hr*2]))
             ))
     )
    );
}

function multipliers(angle) {
    const rad = angle * Math.PI/180;
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    return {x,y};
}