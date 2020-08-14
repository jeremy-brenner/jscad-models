function main() {
    const w = 8;
    const t = 2;
    const hookIR = 2.75;

    const mbr = 16.5;
    const middleBump = difference(
        cylinder({r:mbr,h:w}),
        cylinder({r:mbr-t,h:w}),
        translate([-mbr-9.5,-mbr,0],cube({size:[mbr*2,mbr*2,w]}))
    );
    
    const endHook = _endHook({w,t,hookIR});

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
        translate([0.5,0,0],endHook),
        translate([0.5,60,0],mirror([0,1,0],endHook)),
        translate([-4.25,0,0],cube({size:[t,20,w]})),
        translate([-11.75,0,0],cube({size:[t,7,w]})),
        translate([-7,0,0],mirror([0,1,0],endHook)),
        translate([-mbr-2.25,20,0],middleBump),
        translate([-11.75,32.75,0],cube({size:[t,7,w]})),
        translate([-4.25,46.5,0],cube({size:[t,13.5,w]})),
        translate([-13.25,38.25,0],intersection(
            rotate([0,0,-45],cube({size:[t,14,w]})),
            translate([1.5,0,0],cube({size:[9.5,10,w]}))
        )),
        translate([-14.5,0,0],intersection(translate([0,-hookIR*2,0],cube({size:[hookIR*2,hookIR*2,w]})),endHook)),
        translate([-17,-4.75,0],cube({size:[3,t,w]})),
        translate([-17,0,0],intersection(translate([-hookIR*2,-hookIR*2,0],cube({size:[hookIR*2,hookIR*2,w]})),endHook)),
        translate([-21.75,0,0],cube({size:[t,6,w]})),
        translate([-21.75,4,0],cube({size:[4.75,t,w]})),
        translate([-19,4,0],cube({size:[t,14,w]})),
        translate([-11.85,21.5,0],mirror([1,0,0],vee))

    );
}

function _endHook({w,t,hookIR}) {
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