
function main() {
    return difference(
        union(
            cylinder({d:20, h:35}),
            translate([-10,0,0],cube([20,45,35]))
        ),
        cylinder({d:5.5,h:35}),
        cylinder({d:10,h:2, fn:6}),
        translate([-10,-10,3.75],cube({size:[20,20,27.5]})),
        translate([-10,20,17.5],rotate([0,90,0],cylinder({d:5,h:20}))),
        translate([-10,35,10],rotate([0,90,0],cylinder({d:5,h:20}))),
        translate([-10,35,25.5],rotate([0,90,0],cylinder({d:5,h:20}))),
        translate([0,20,17.5],rotate([0,90,0],cylinder({d:10,h:10}))),
        translate([0,35,10],rotate([0,90,0],cylinder({d:10,h:10}))),
        translate([0,35,25.5],rotate([0,90,0],cylinder({d:10,h:10})))
    );
}