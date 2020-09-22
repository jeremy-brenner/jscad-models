include("../lib/seq.jscad");

function main() {
    const size = [70,130,32]
    const t = 1.5;
    
    const holeSpacing = 24;
    const hole = rotate([0,0,45],cube({size:[13,13,size[2]]}))

    const holeRow = seq(3).map( i => translate([i*holeSpacing,0,0],hole))
    const holeGrid = seq(5).flatMap(i => translate([0,i*holeSpacing,0],holeRow));

    const holeRowOther = translate([holeSpacing/2,holeSpacing/2,0],seq(2).map( i => translate([i*holeSpacing,0,0],hole)))
    const holeGridOther = seq(4).flatMap(i => translate([0,i*holeSpacing,0],holeRowOther));
    
    const grid = union(        
        ...holeGrid,
        ...holeGridOther
    )

    const block = difference(
        cube({size}),
        translate([t,0,t],cube({size:[size[0]-t*2,size[1],size[2]-t*2]}))
    )

    return difference(
        center([true,true,false],block),
        center([true,true,false],grid)
    )
}