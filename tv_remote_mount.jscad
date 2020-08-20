function main() {
    const screwHole = union(
        cylinder({r:3.5,h:1}),
        cylinder({r:1.75,h:2})
    )

    const tab = union(
        cylinder({r:5.5,h:2}),
        rotate([0,0,35],cube({size:[11,55.7,2],center:[true,false,false]})),
        rotate([0,0,-35],cube({size:[11,55.7,2],center:[true,false,false]})),
        translate([0,34,0],cube({size:[55,14.7,2],center:[true,false,false]}))
    )

    const cubbyCutter = translate([0,-250,-250],cube({size:[500,500,500]}));

    const outerCapsule = capsule({r:22.5, h:115});
    const innerCapsule = capsule({r:21, h:115});
    const hollowCapsule = difference(outerCapsule,innerCapsule);

    const cutCapsule = difference(
        hollowCapsule,
        rotate([0,0,-50],cubbyCutter),
        rotate([0,0,-90],cubbyCutter)
    );

    const lip = intersection(
        rotate([0,0,-50],translate([-1.5,19,-250],cube({size:[1.5,3,500]}))),
        outerCapsule
    );
    const cubby = union(
        cutCapsule,
        lip
    )

    const screwTab = difference(
        tab,
        screwHole
    )

    return union(
        translate([0,41.5,22.5],rotate([0,0,0],rotate([0,-90,0],center([false,false,true],cubby)))),
        screwTab
    )
}

function capsule({r,h}) {
    return union(
        sphere({r}),
        cylinder({r,h}),
        translate([0,0,h],sphere({r}))
    )
}