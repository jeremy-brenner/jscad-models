function main() {

    const sideWall = cube({size:[1.5,100,53.5]});
    const bottom = difference(
        cube({size:[115,100,1.5]}),
        translate([10,15,0],cube({size:[95,70,2]}))
    );
    const top = bottom;

    const screwTabHole = union(
        cylinder({r:2,h:8}),
        translate([0,0,4],cylinder({r2:4.25,r1:2,h:4}))
    );
    const screwTabBase = union(
        cylinder({h:8,r:9}),
        translate([0,-9,0],cube({size:[9,18,8]}))
    )
    const screwTab = translate([-9,9,0],difference(
        screwTabBase,screwTabHole
        ));
    return union(
        translate([-1.5,0,0],sideWall),
        translate([114,0,0],sideWall),
        cube({size:[115,10.5,8]}),
        translate([0,0,0],bottom),
        translate([0,0,52],top),
        screwTab,
        translate([0,82,0],screwTab),
        translate([115.5,18,0],rotate([0,0,180],screwTab)),
        translate([115.5,100,0],rotate([0,0,180],screwTab))
    );

}