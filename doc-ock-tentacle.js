
const hw = 80;
const hh = 60;
const ht = 30;
const bb = 8;
const thickness = 1;
const sb = hw/5;

const sw = 1-thickness*2/hw;
const sh = 1-thickness*2/hh;

const quality = 1;

const fn = 16 * quality;

function main() {
    return union( 
        difference(
        center(true,humps()),
        center(true,scale([sw, 1, sh], humps()))
    ),
        translate([0,0,-hh/2],center(true, sucker()))
//center(true,hump())
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
      union(
          torus({ ri: sb/2, ro: sb, fni: fn / 2, fno: fn }),
          torus({ ri: sb/2, ro: sb/3, fni: fn / 2, fno: fn })
      ));
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
