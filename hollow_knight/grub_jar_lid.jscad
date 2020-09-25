function main() {
    const fn = 64;
    const hfn = 32;
    const lipR = 33;
    const lipH = 5;
     
    const wallT = 1.5;
    const bottomR = lipR+wallT;
    const bottomH = lipH+wallT;
    const bottomBr = 1.5;

    const middleR = bottomR*0.7;
    const middleH = 4;
    const middleBumpScale = 0.15;

    const handleR = 2.8;
    
    const handle = rotate([0,90,0],union(
        sphere({r:handleR,fn:hfn}),
        translate([0,-handleR*0.9,0],torusQuarter({ri:handleR,ro:handleR*0.9,fno:hfn,fni:hfn})),
        translate([0,-handleR*0.9,0],mirror([0,1,0],torusQuarter({ri:handleR,ro:handleR*0.9,fno:hfn,fni:hfn}))),
        translate([0,-handleR*2*0.9,0],rotate([0,90,0],cylinder({r:handleR,h:-handleR*0.3,fn:hfn}))),
        translate([-handleR*0.3,-handleR*0.3,0],mirror([1,1,0],torusQuarter({ri:handleR,ro:handleR*1.5,fno:hfn,fni:hfn}))),
        translate([-handleR*2*0.9,handleR*0.3,0],rotate([0,90,90],cylinder({r:handleR,h:-handleR*0.6,fn:hfn}))),
        translate([-handleR*0.3,handleR*0.3,0],mirror([1,0,0],torusQuarter({ri:handleR,ro:handleR*1.5,fno:hfn,fni:hfn}))),
        translate([handleR*0.4,handleR*2*0.9,0],rotate([0,90,0],cylinder({r:handleR,h:-handleR*0.7,fn:hfn}))),
        translate([handleR*0.4,-handleR*0.2,0],torusQuarter({ri:handleR,ro:handleR*2,fno:hfn,fni:hfn})),
        translate([handleR*2.4,-handleR*0.2,0],rotate([0,90,90],cylinder({r:handleR,h:-handleR*0.1,fn:hfn}))),
        translate([handleR*3.9,-handleR*0.3,0],mirror([1,1,0],torusQuarter({ri:handleR,ro:handleR*1.5,fno:hfn,fni:hfn}))),
        translate([handleR*3.9,-handleR*2*0.9,0],rotate([0,90,0],cylinder({r:handleR,h:2,fn:hfn})))
    ));
    
    // return handle;

    const bottomPiece = beveledCyl({r:bottomR,h:bottomH,br:bottomBr,fn});

    const middlePiece = union(
        cylinder({r:middleR,h:middleH,fn}),
        translate([0,0,middleH],scale([1,1,middleBumpScale],sphere({r:middleR,fn})))
    )

    const lipCutout = union(
        beveledCyl({r:lipR,h:lipH,br:bottomBr,fn}),
        translate([0,0,lipH],cylinder({r:middleR-wallT,h:middleH-wallT,fn}))
    )

    return difference(
        union(
            bottomPiece,
            translate([0,0,bottomH],middlePiece)
            ,translate([0,handleR*1.8,26],handle)
        ),
        lipCutout
    //  ,translate([0,0,bottomH+middleH+middleR*middleBumpScale-1.2],cylinder({r:handleR+0.2,h:2,fn:hfn}))
    )
}

function torusQuarter({ri,ro,fno,fni}){ 
    return intersection(
        torus({ri,ro,fno,fni}),
        translate([0,0,-ri],cube({size:[ro+ri,ro+ri,ri*2]}))
    )
}

function beveledCyl({r,h,br,fn}) {
    const bh = h-br;
    return union(
        cylinder({r,h:bh,fn}),
        translate([0,0,bh],cylinder({r:r-br,h:br,fn})),
        translate([0,0,bh],torus({ri:br,ro:r-br,fno:fn}))
    )
}