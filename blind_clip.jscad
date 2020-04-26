function main() {
    const w = 18;

    const top = union(
        translate([0,0,3],cube({size:[11,w,4]})),
        translate([3,0,0],cube({size:[4,w,7]})),
        difference(
            translate([7,0,1],cube({size:[4,w,6]})),
            translate([8,0,1],rotate([-90,0,0],cylinder({r:1,h:w})))  
        ),
        translate([10,0,1],rotate([-90,0,0],cylinder({r:1,h:w})))
    )
    const mountPlate = translate([0,-11,0],
        difference( 
            cube({size:[4,40,20]}),
            translate([0,5,12],rotate([0,90,0],cylinder({r:2,h:4}))),
            translate([0,35,12],rotate([0,90,0],cylinder({r:2,h:4})))
        )
    );

    return union(
           cube({size:[33,w,4]}),
        translate([5,0,8],rotate([0,5,0],cube({size:[28,w,2]}))),
        translate([29,0,0],cube({size:[4,w,16]})),
        translate([29,0,12],cube({size:[11,w,4]})),
        translate([36,0,10],cube({size:[4,w,6]})),
        cube({size:[4,w,43]}),
        mountPlate,
        translate([0,0,36],top )
    );
}