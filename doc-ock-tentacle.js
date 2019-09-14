
const hw = 80;
const hh = 60;
const ht = 30;
const bb = 8;
const t = 1;
const sb = hw/5;



const quality = 1;

const fn = 16 * quality;

const w = 10;
function main() {
    return union( 
 difference(
  translate([0,-ht*2,0], hollowOut(intersection(hump(), translate([10.5,2,0],cube([hw-21,ht-2,hh]))),1,0,1)),
translate([0,-ht-ht/2,hh/2],rotate([0,90,0],cylinder({r: 5, h: 80})))

),
flanges(),
 
       difference(
           hollowOut(humps(),t,0,t),
           translate([6.5,-ht*1.5,t],cube([4,ht,4])),
            translate([hw-10.5,-ht*1.5,t],cube([4,ht,4]))
),
        translate([hw/2,-ht/2,0],center(true, sucker()))
    );
}

function flanges() {
   return difference(
union(
    support(),
translate([10,ht*3,0],rotate([0,0,180],flange(10))),
translate([hw-10,0,0],flange(10))
),
   translate([0,ht*2-2,0],cube([hw,2,hh])),
                  linear_extrude({ height: hh }, polygon([ [0,0],[hw,0],[hw-10,ht],[10,ht] ])),
      translate([8,ht+ht/2,hh/2],rotate([0,90,0],cylinder({r: 5, h: 66})))         

   );
}

function support() {
    return difference( hump(), translate([10,0,0],cube([hw-20,ht,hh])));
}

function flange(w) {
    return translate([w/2,ht+ht/2,23],
        center(true,
            intersection(
             translate([0,0,hh-hw/2],rotate([90,0,0],sphere({r: hw/2, fn}))),
                translate([hw/2-w/2,0,hh/2],center(true,cube([w,ht,hh])))
            )
        )  
    );
  
}

function humps() {
    return union(
       translate([hw,0,0],rotate([0,0,180],hump())),
       hump()
    );
}

function hump(o=0) {
    return intersection(
    humpBase(),
    difference(
        cube([hw, ht-o, hh]),
        bevel(),
        translate([hw,ht,0],rotate([0,0,180],bevel()))
        )
   );
}

function sucker() {
  return intersection(
      translate([0,0,-sb/2],center([true,true,false],cube([sb*3,sb*3,sb/4]))),
      hollowOut(     
        union(
          torus({ ri: sb/2, ro: sb, fni: fn / 2, fno: fn }),
          torus({ ri: sb/2, ro: sb/3, fni: fn / 2, fno: fn })
        ),
        t,t,t
      )
    );
}

function humpBase() {
    return  translate([hw/2,ht/2,0],
    intersection(
    difference(
      union(
        translate([0,0,hh-hw/2],rotate([90,0,0],sphere({r: hw/2, fn})))
        ,cylinder({r:hw/2, h: hh-hw/2, fn})
      ),
      difference(
        cylinder({r:hw/2, h: bb/2, fn}),
        union(
          translate([0,0,bb/2],torus({ ri: bb/2, ro: hw/2-bb/2, fni: fn, fno: fn })),
          cylinder({r:hw/2-bb/2, h: bb, fn})
        )
      )
      ),
    translate([-hw/2,-hw/2,0],cube([hw,hw,hh]))
    )
    )
}

function bevel() {
    const d = 4;
    return translate([0,bb/d,bb/d],rotate([90,180,90],difference(
        cube([bb/d, bb/d, hw]),
        cylinder({ r: bb/d, h: hw, fn: fn })
    )));
}

function hollowOut(object, tx,ty,tz) {
    
    const b = object.getBounds();
    
    const xw = b[1].x - b[0].x;
    const yw = b[1].y - b[0].y;
    const zw = b[1].z - b[0].z;
    
    const sx = 1-tx*2/xw;
    const sy = 1-ty*2/yw;
    const sz = 1-tz*2/zw;
    
    const scaledObject = scale([sx, sy, sz], object);
    
    const sob = scaledObject.getBounds();
    
    const dx = b[1].x - sob[1].x - tx;
    const dy = b[1].y - sob[1].y - ty;
    const dz = b[1].z - sob[1].z - tz;
    
    return difference(
        object,
        translate([dx,dy,dz],scaledObject)
    );
}

