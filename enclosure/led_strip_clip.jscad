function main() {

    const length = 150;
    const width = 17.5;
    const screwPlateLength = 10;

    const screwPlate = cube({size:[screwPlateLength,width,3],center:[true,true,false]});
    const screwHole = difference(
        screwPlate,
        cylinder({r1:1.75,r2:3.75,h:3})
    );

    const screwHoles = union(
        screwHole,
        translate([length/2-width/2,0,0],screwHole),
        translate([length/-2+width/2,0,0],screwHole)
    )
    const mainClip = difference(
        cube({size:[length,width,5.5], center:[true,true,false]}),
        cube({size:[length,3.75*2,5.5], center:[true,true,false]}),
        translate([0,0,3],cube({size:[length,15.5,1], center:[true,true,false]})),
        translate([0,0,4],cube({size:[length,14.5,1.5], center:[true,true,false]}))
    )

    const ledClip = difference(
        cube({size:[length,12.125,1], center:[true,true,false]}),
        cube({size:[length,10.125,0.5], center:[true,true,false]}),
        cube({size:[length,9.125,1], center:[true,true,false]})

    )


    return union(
        mainClip,
        translate([0,0,3],ledClip),
        screwHoles
    );
}