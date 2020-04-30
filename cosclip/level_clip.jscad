const quality = 4;
const z = 3;

function main() {
    const topClip =
      rotate([90,0,0],
        union(
            translate([0,0,-1],union(
                cylinder({r:4.5,h:2}),
                cube({size:[9,5,2], center:[true,false,false]})
            )),
            difference(
                cylinder({r:3.75,h:2}),
                translate([0,0,1.2],rotate([2,0,0],cube({size:[10,10,2], center:[true,true,false]})))
            )
        )
    );

    const rectagle =        difference(
        cube({size:[14,33.25,2],center:[true,true,false]}),
        cube({size:[10,29.25,2], center:[true,true,false]})
    );

    const bottomClip = union(
        cube({size:[9,1.5,3], center:[true,false,false]}),
        translate([0,1.3,1.7],
            difference(
            cube({size:[9,1,1.3], center:[true,false,false]}),
            rotate([12,0,0],translate([0,0.5,-1],cube({size:[9,2,3], center:[true,false,false]})))
            )
        )
    );

    return union(
        rectagle,
        translate([0,-16.125,2],bottomClip),
        translate([0,16.125,2],rotate([0,0,180],bottomClip)),
        translate([0,15.625,-3],topClip),
        translate([0,-15.625,-3],rotate([0,0,180],topClip))
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}