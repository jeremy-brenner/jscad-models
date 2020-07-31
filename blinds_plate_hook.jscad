function main() {
    const w = 8;
    const t = 2;

    const mbr = 16.5;
    const middleBump = difference(
        cylinder({r:mbr,h:w}),
        cylinder({r:mbr-t,h:w}),
        translate([-mbr-8.5,-mbr,0],cube({size:[mbr*2,mbr*2,w]}))
    );
    
    const endHook = _endHook({w,t});

    const veeLeg = rotate([0,0,21.25],union(
        cube({size:[7,t,w]}),
        translate([7,1,0],cylinder({r:1,h:w}))
    ));

    const vee = union(
        veeLeg,
        mirror([0,1,0],veeLeg),
        intersection(
            cylinder({r:t,h:w}),
            translate([-t-2,-t,0],cube({size:[t*2,t*2,w]}))
        )
    );
    return union(
        endHook,
        translate([0,60,0],mirror([0,1,0],endHook)),
        translate([-4.25,0,0],cube({size:[t,20,w]})),
        translate([-10.75,0,0],cube({size:[t,7,w]})),
        translate([-6.5,0,0],mirror([0,1,0],endHook)),
        translate([-mbr-2.25,20,0],middleBump),
        translate([-10.75,32.25,0],cube({size:[t,7,w]})),
        translate([-4.25,46,0],cube({size:[t,14,w]})),
        translate([-12.25,38,0],intersection(
            rotate([0,0,-45],cube({size:[t,14,w]})),
            translate([1.5,0,0],cube({size:[8.5,10,w]}))
        )),
        translate([-13,0,0],intersection(translate([0,-4.25,0],cube({size:[4.25,4.25,w]})),endHook)),
        translate([-16,-4.25,0],cube({size:[3,t,w]})),
        translate([-16,0,0],intersection(translate([-4.25,-4.25,0],cube({size:[4.25,4.25,w]})),endHook)),
        translate([-20.25,0,0],cube({size:[t,6,w]})),
        translate([-20.25,4,0],cube({size:[4.75,t,w]})),
        translate([-17.5,4,0],cube({size:[t,14,w]})),
        translate([-10.35,21.5,0],mirror([1,0,0],vee))

    );
}

function _endHook({w,t}) {
    const hookIR = 2.25;
    const hook = difference(
        cylinder({r:hookIR+t, h:w}),
        cylinder({r:hookIR, h:w}),
        cube({size:[(hookIR+t)*2,hookIR+t,w],center:[true,false,false]})
    );

    return union(
        hook,
        translate([hookIR+t/2,0,0],cylinder({r:t/2,h:w}))
    );
}