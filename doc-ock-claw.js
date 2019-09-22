
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
        [...Array(segments).keys()].map( (i) => positionedSegment(i))
    );
}

function positionedSegment(i) {
    const sa = i*segmentAngle*(100-i*3.5)/100;
    const {tx,tz} = {
       tx:multipliers(sa).cos*curveRadius,
       tz:multipliers(sa).sin*-curveRadius
    };
    const sm = multipliers(sizeAngle*i).sin;
    const s = 20-i*sm*1.4;
    const hr = 6-i*sm*0.4;
    return translate([tx,0,tz], 
        rotate([0,sa,0],
            translate([-s+hr/2,0,0], segment(hr,s) )
        )
    );
}

function segment(hr,s) {
    const cubeH = hr*1.5;
    return intersection(
        torus({ ri: hr, ro: s, fni: fn / 2, fno: fn }),
        translate([s-(cubeH-hr),-s-hr,-hr],
            cube([cubeH,(s+hr)*2,hr*2])
        )
    );
}


function multipliers(angle) {
    const rad = angle * Math.PI/180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {cos,sin};
}