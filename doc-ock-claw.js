
const quality = 1;

const fn = 16 * quality;

const height = 20;
const hole_r = 15;
const hole_d = 40;
const inner_height = height-hole_d;
const small_section_r = hole_r + 1;
const large_section_r = small_section_r + 1;

const bump_r = large_section_r+25;

const curveRadius = 35;
const segmentAngle = 14;
const sizeAngle = 8;
const segments = 12;

const clawXd = 50;
const clawYd = 40;
const sideYd = clawYd - 7.7;
const clawA = 15;

const plateW=45;
const plateL=100;
const plateH=4;

const connectorScale = 0.35;
const printSize = 0.95;
const scaleFactor=printSize/connectorScale;

function main() {
    const start = Date.now();
    const model = scale([scaleFactor,scaleFactor,scaleFactor],render());
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    return union(
        plate(),
        claws(),
    //     difference(
    // translate([0,0,15],mount()),
    //  cylinder({r:hole_r, h:hole_d, fn})
    //  ),
    intersection(
       translate([0,0,25],connector()),
       cylinder({r:hole_r, h:hole_d, fn})
       )
    );
}

function connector() {
    return scale([connectorScale,connectorScale,connectorScale],
        difference( 
            union(
        translate([9,32.5,0],
            rotate([90,0,0],
                cylinder({r: 4.5, h: 65, fn})
            )
        ),
        translate([-40,-29.5,-15],
              cube([80,59,30])
        )
        ),
         translate([-40,-26.5,-15],cube([80,53,30]))
        )
    );
}

function claws() {
    return union(
        translate([clawXd,clawYd,0],rotate([0,0,clawA],claw())),
        translate([clawXd,-clawYd,0],rotate([0,0,-clawA],claw())),
        translate([-clawXd,-clawYd,0],rotate([0,0,180+clawA],claw())),
        translate([-clawXd,clawYd,0],rotate([0,0,180-clawA],claw()))
    );
}

function plate() {
    return difference( union(
        translate([0,0,15],mount()),
        translate([0,sideYd,-1.7],sideA()),
        translate([0,-sideYd,-1.7],rotate([0,0,180],sideA())),
        translate([-13.5,0,-1.7], sideB()),
        translate([13.5,0,-1.7], rotate([0,0,180],sideB()))
    ),
    cylinder({r:hole_r, h:hole_d, fn})
    );
}

function sideA() {
    return center([true,true,false],
        difference(
            intersection(
                translate([-28.5,-160,17],cube([57,80,9])),
                torus({ri:26, ro:118, fni:fn, fno:fn*2})
            )
        )
    );
}

function sideB() {
    return center([true,true,false],
    difference(
        intersection(
            translate([6,-60,17],cube([60,120,9])),
            torus({ri:26,ro:37.5, fni:fn, fno:fn*2})
        ),
       translate([-16,10,17],rotate([0,0,-clawA], cube([20,60,9]))),
       translate([0,-70,17],rotate([0,0,clawA], cube([20,60,9])))

        )
    );
}

function disk({ri,ro,fni,fno}) {
  return union(
      torus({ ri, ro, fni, fno }),
      translate([0,0,-ri],cylinder({r:ro,h:ri*2,fn:fno}))
      );
}

function claw() {
    return rotate([0,-90,0],
        center(true,
            union( 
                [...Array(segments).keys()].map( (i) => positionedSegment(i))
            )
        )
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
    console.log({ ri: hr, ro: s, fni: fn / 2, fno: fn, cubeH });
    return intersection(
        disk({ ri: hr, ro: s, fni: fn / 2, fno: fn }),
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


function mount() {
    return union(
     cylinder({r:small_section_r, h:height, fn:16}),
     translate([0,0,height/2],cylinder({r1: large_section_r, r2: small_section_r, h: 1, fn:16})),
    cylinder({r:large_section_r, h:height/2, fn:16})
     );
}


