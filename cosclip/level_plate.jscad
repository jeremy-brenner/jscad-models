function main() {
    const z = 2.5;
    const plate = cube({size:[20,50,z], center: [true,true,false]});
    const hole = cylinder({r:3.3,h:z});
    const bevel = cylinder({r:3.6,h:1.5});
  
    const levelPlate = translate([0,0,z],rotate([180,0,0],difference(plate, hole, bevel)));

    const ridge = translate([6.5,0,0],sphere({r:1.125, fn:16}));
    const ridgeCount = 24;
    const ridges = translate([0,0,-0.10],union( seq(ridgeCount).map( i => rotate([0,0,i*360/ridgeCount], ridge) ) ));
    return difference(
        levelPlate,
        ridges
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}