
function main() {
    const hook = intersection(
        difference(
            union(
                cylinder({r:6, h:4}),
                translate([0,0,4],cylinder({r:7.5, h:2}))
            ),
            cylinder({r:4,h:6})
        ),
        translate([-7.5,-7.5,0],cube({size:[15,7.5,8]}))
    );
     
    const cupHole = difference(
        union(
            cylinder({r:39.5,h:60}),
            translate([-39.5,0,0],cube({size:[79,39.5,60]}))
        ),
        cylinder({r:37.5,h:60})
    )

    const holder = union(
        hook,
        translate([0,50,0],hook),

        //back
        translate([-39.5,-30,-2],cube([79,85,2])),

        translate([0,30,-39.5],rotate([90,0,0],cupHole))

    );

    return holder;
}