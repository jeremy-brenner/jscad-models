function main() {
    const quality = 4;

    const z = 2.5;
    const w = 20;
    const l = 45;

    const plate = cube({size:[w,l,z], center: [true,true,false]});
   
    const postH = 2.2;
    const shaft = cylinder({r:3.1,h:postH});
    const bevel = cylinder({r1:3.1,r2:3.5,h:0.9});
    const hole = cylinder({r:1.5,h:postH});

    const slit = cube({size:[10,1,postH], center: [true,true,false]});
    const post = difference(
        union(shaft,bevel),
        hole,
        slit,
        rotate([0,0,90],slit)
    )
    const postPositioned = translate([0,0,postH+z],rotate([180,0,0],post));

    const clipHole = union(
        translate([0,-1,0],cube({size:[10,2.5,z],center:[true,false,false]})),
        translate([0,-1,1],cube({size:[10,3,z-1],center:[true,false,false]}))
    )


    const ridge = translate([6.5,0,0],intersection(cube({size:[3,3,1.25], center:[true,true,false]}),sphere({r:1.25, fn:4*quality})));
    const ridgeCount = 24;
    const ridges = translate([0,0,z-0.5],union( seq(ridgeCount).map( i => rotate([0,0,i*360/ridgeCount], ridge) ) ));

    const levelPlateClip = union(plate, postPositioned);

    const levelPlateClipWithRidges = union(levelPlateClip,ridges)

    return difference(
        levelPlateClipWithRidges,
        translate([0,-16.125,0],clipHole),
        translate([0,16.125,0],rotate([0,0,180],clipHole))
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}