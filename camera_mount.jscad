
function main() {
    const capH = 45;
    const holeR = 17.75;

    const hole = cylinder({r:holeR,h:capH-2});

    const cap = cylinder({r:holeR+1,h:capH});
    const arm = cube({size:[(holeR+1)*2,(holeR+1)*4,5], center:[true,false,false]});
    const mount = translate([0,(holeR+1)*3,0],cube({size:[(holeR+1)*2,holeR+1,capH], center:[true,false,false]}));

    return difference(
        union(cap,arm,mount),
        hole
    );
}