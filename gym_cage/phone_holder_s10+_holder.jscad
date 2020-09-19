include('usb_c_l.jscad');

function main() {
    const r = 5.5;
    const w = 78.5;
    const t = 2;

    const boxW = w-r*2;
    const or = r+t;
    const sideLen = 70;


    const sideCap = translate([0,0,or],
        rotate([-90,0,0],
            union(
                difference(
                    cylinder({r:or,h:sideLen}),
                    cylinder({r,h:sideLen}),
                    cube({size:[or,or*2,sideLen], center:[false,true,false]}),
                    rotate([0,0,-45],cube({size:[or,or*2,sideLen], center:[false,true,false]}))
                ),
                rotate([0,0,-45],translate([0,-or+t/2,0],cylinder({r:t/2,h:sideLen})))
            )
        )
    )

    const alignmentCube = translate([0,0,-1.5],
            difference(
                rotate([0,0,45],
                    intersection(
                        cube({size:[28,28,1.5],center:[true,true,false]}),
                        cylinder({r:17.9,h:1.5})
                    )
                ),
                cube({size:[1.7,40,1.5], center:[true,true,false]}),
                cube({size:[40,1.7,1.5], center:[true,true,false]})
            )
    );


    const rotatorConnection = union(
        cylinder({r:23,h:t}),
        alignmentCube
    )
    
    const back = union(
        translate([boxW/2,sideLen-5,-11],translate([0,0,11],
            rotatorConnection
            )
        ),
        translate([-0.25,0,0],cube({size:[boxW+0.5,sideLen,t]})),
        sideCap,
        translate([boxW,0,0],mirror([1,0,0],sideCap))
    );

    const holderT = difference(
        back,
        translate([0,sideLen/2,0],cylinder({r:24,h:20})),
        translate([boxW,sideLen/2,0],cylinder({r:24,h:20}))
    )

    const phoneHolder = union(
        holderT, 
        translate([boxW/2,-30,0],cube({size:[28,30,t],center:[true,false,false]})),
        translate([boxW/2,-28.5,2+t],center([true,false,false],rotate([0,0,90],usbCL())))
    );

    return phoneHolder;
}