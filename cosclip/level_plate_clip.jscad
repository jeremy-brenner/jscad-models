function main() {
    const z = 2;
    const plate = cube({size:[20,20,z], center: [true,true,false]});
   
    const shaft = cylinder({r:3,h:2.2});
    const bevel = cylinder({r1:3,r2:3.4,h:0.9});
    const hole = cylinder({r:1.8,h:2.2});

    const slit = cube({size:[10,1,2.2], center: [true,true,false]});
    const post = difference(
        union(shaft,bevel),
        hole,
        slit,
        rotate([0,0,90],slit)
    )
    const postPositioned = translate([0,0,4.2],rotate([180,0,0],post));

    const ridge = translate([6.5,0,0],sphere({r:1.125, fn:16}));
    const ridgeCount = 24;
    const ridges = translate([0,0,z-0.5],union( seq(ridgeCount).map( i => rotate([0,0,i*360/ridgeCount], ridge) ) ));

    const levelPlateClip = union(plate, postPositioned);

    const levelPlateClipWithRidges = union(levelPlateClip,ridges)
    return levelPlateClipWithRidges;
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}