function main() {
    const bottleR = 54.2;
    const ringT = 1.5;
    const ringH = 160;
    const fn = 64;

    const hole = rotate([45,0,0],cube({size:[(bottleR+ringT)*2,30,30], center:[true,false,false]}))
    const holeLayer = union(
        hole,
        rotate([0,0,60],hole),
        rotate([0,0,120],hole)
    )
    const allHoles = union(
        translate([0,0,0], holeLayer),
        translate([0,0,35], rotate([0,0,30], holeLayer) ),
        translate([0,0,70], holeLayer ),
        translate([0,0,105], rotate([0,0,30], holeLayer) )
    )
    //const 
    // return difference(
    //     cylinder({r:bottleR+ringT,h:5,fn}),
    //     cylinder({r:bottleR,h:5,fn})
    // )

    const ring = difference(
        cylinder({r:bottleR+ringT,h:ringH,fn}),
        cylinder({r:bottleR,h:ringH,fn})
    )

    return difference(
        center([false,false,true],ring),
        center([false,false,true],allHoles)
    )

}