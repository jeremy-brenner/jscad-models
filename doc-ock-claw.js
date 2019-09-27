
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

const clawXd = 52.5;
const clawYd = 40;
const sideYd = clawYd - 7.7;
const clawA = 15;

const plateW=45;
const plateL=100;
const plateH=4;

const connectorScale = 0.48;
const printSize = 0.95;

const scaleFactor=1/connectorScale;

const mountScale = 0.35;
const mountSf=1/mountScale


function main() {
    const start = Date.now();
    const model = scale([printSize,printSize,printSize],render());
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
// return fullClaw();
    return fullSaw();

 /* for printing */
  //return sawBlade();
 // return plate();
 // return claw();
 // return sawDisk()
  //return sawConnector();
 // return mount();
 // return plateInsert();
 // return plateConnector();
}

function fullSaw() {
   return union(
       mount(),
       sawConnector(),
       sawDisks(),
       sawBlade()
    );
}

function fullClaw() {
    return union(
        plate(),
        claws(claw()),
        mount(),
        plateInsert(),
        plateConnector()
    );
}

function sawDisks() {
    return translate([0,0,-45.5],
        center(true,
            union(
                translate([0,2,0],sawDisk()),
                translate([0,-2,0],sawDisk())
            )
        )
    );
}


function sawBlade() {
    return translate([0,0,-45.5],
        center(true,
            union(
                rotate([90,0,0],
                    difference(
                        cylinder({r:92,h:2,fn}),
                        cylinder({r:1.5,h:2,fn})
                    )
                ),
                sawTeeth(91)
            )
        )
    );
}

function multipliers(angle) {
    const rad = angle * Math.PI/180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {cos,sin};
}


function sawTeeth(r) {
    return union([...Array(32).keys()].map(i => {
        const angle = 360/32*i;
        const l = 360/32*r/50;
        const {cos,sin} = multipliers(angle);
        return translate([r*cos, -1, r*sin], rotate([0,-angle+90,0],sawTooth(l)));
    }));
}

function sawTooth(l) {
  const w = 2;
  //const l = 18;
  const h = 15;
  return polyhedron({     
    points: [ 
        [l/2,w/2,0],
        [l/2,-w/2,0],
        [-l/2,-w/2,0],
        [-l/2,w/2,0], 
        [0,-w/2,h] 
      ],                         
    triangles: [ 
        [0,1,4],
        [1,2,4],
        [2,3,4],
        [3,0,4],
        [1,0,3],
        [2,1,3] 
      ]                 
  });
}


function sawDisk() {
    return rotate([90,0,0],
        difference(
            cylinder({r:18,h:2,fn}),
            cylinder({r:1.5,h:2,fn})
        )
    );
}

function sawConnector() {
    return translate([0,0,38],
        scale([mountSf,mountSf,mountSf],
            union(
                translate([0,0,10],cylinder({r:small_section_r-8,h:10,fn})),
                translate([0,0,10],cylinder({r:small_section_r-6,h:1,fn})),
                translate([0,0,9],
                    difference(
                        sawConnectorSegments(),
                        translate([0,0,-26],center(true,cube([50,2,50]))),
                        translate([0,10,-38.5],rotate([90,0,0],cylinder({r:0.5,h:20,fn})))
                    )
                )
            )    
        )
    );
}

function sawConnectorSegments() {
    return union([...Array(12).keys()].map(i=>translate([0,0,i*-3.5],disk({ri:2.5,ro:6-i/3,fni:fn/2,fno:fn}))));
}

function claws(renderedClaw) {
    return union(
        translate([clawXd*scaleFactor,clawYd*scaleFactor,0],rotate([0,0,clawA],renderedClaw)),
        translate([clawXd*scaleFactor,-clawYd*scaleFactor,0],rotate([0,0,-clawA],renderedClaw)),
        translate([-clawXd*scaleFactor,-clawYd*scaleFactor,0],rotate([0,0,180+clawA],renderedClaw)),
        translate([-clawXd*scaleFactor,clawYd*scaleFactor,0],rotate([0,0,180-clawA],renderedClaw))
    );
}

function plateInsert() {
    return translate([0,0,30],scale([mountSf,mountSf,mountSf],mountSegment(small_section_r-8,small_section_r-6, 7.5)));
}

function plateConnector() {
        return translate([0,0,38],scale([mountSf,mountSf,mountSf],cylinder({r:small_section_r-8,h:17,fn})));

}

function plate() {
    return difference(
        scale([scaleFactor,scaleFactor,scaleFactor], 
            union(
                translate([0,sideYd,-1.7],sideA()),
                translate([0,-sideYd,-1.7],rotate([0,0,180],sideA())),
                translate([-13.5,0,-1.7], sideB()),
                translate([13.5,0,-1.7], rotate([0,0,180],sideB()))
            )
        ),
        scale([mountSf,mountSf,mountSf],cylinder({r:small_section_r-6, h:hole_d, fn}))
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
    return scale([scaleFactor,scaleFactor,scaleFactor],
        rotate([0,-90,0],
            center(true,
                union( 
                    [...Array(segments).keys()].map( (i) => {
                        return i === 0 ? difference(
                            positionedSegment(i),
                            translate([30,-25,0.5],cube([15,50,15]))
                        ) : positionedSegment(i);
                    })
                )
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

    return translate([0,0,30*mountSf],
        union(
            scale([mountSf,mountSf,mountSf],
            union(
                difference(
                    union(
                        translate([0,0,height/2-1],cylinder({r1: small_section_r, r2: large_section_r, h: 1, fn:16})),
                        translate([0,0,height/2],cylinder({r:large_section_r, h:height/2, fn:16}))
                    ),
                    cylinder({r:hole_r, h:hole_d, fn})
                ),
                translate([0,0,6],mountSegment(small_section_r-2,small_section_r,4)),
                translate([0,0,3],mountSegment(small_section_r-4,small_section_r-2,5)),
                translate([0,0,0],mountSegment(small_section_r-6,small_section_r-4,6)),
                translate([0,0,-4],mountSegment(small_section_r-8,small_section_r-6,8))
            )
            ),
            intersection(
                translate([0,0,13*mountSf],connector()),
                scale([mountSf,mountSf,mountSf],cylinder({r:hole_r, h:hole_d, fn}))
            )
        )
    );
}

function mountSegment(ir,or,h) {
    return difference(
        cylinder({r:or, h, fn}),
        cylinder({r:ir, h, fn})
    );
}

function connector() {
    return difference( 
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
    );
}
