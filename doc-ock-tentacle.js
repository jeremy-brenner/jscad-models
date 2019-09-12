
const hw = 80;
const hh = 60;
const ht = 30;
const bb = 8;
const t = 1;
const sb = hw/5;

const quality = 1;

const fn = 16 * quality;

function main() {
    return union( 
        center([true,true,false],hollowOut(humps(),t,0,t)),
        center(true, sucker())
    );
}

function humps() {
    return union(
       translate([hw,0,0],rotate([0,0,180],hump(ht/2))),
       hump(),
       translate([0,ht,0],hump(ht/2))
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
    return translate([hw/2,ht/2,0],
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
