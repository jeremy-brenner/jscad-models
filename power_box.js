function main() {
    const box = difference([
        cube({size:[90,55,40], center:[true,true,false]}),
        cube({size:[86,51,38], center:[true,true,false]}),
        translate([0,13.75,20],rotate([0,90,0],cylinder({r:6,h:45}))),
        translate([0,-13.75,20],rotate([0,90,0],cylinder({r:6,h:45}))),
        translate([25,10,0],cylinder({r:2.5,h:40})),
        translate([-25,10,0],cylinder({r:2.5,h:40})),
        translate([25,-10,0],cylinder({r:2.5,h:40})),
        translate([-25,-10,0],cylinder({r:2.5,h:40})),
    ]);
    const post = difference([
            cylinder({r:3,h:40}),
            cylinder({r:1.4,h:40}),
    ]);
    return union([
        box,
        translate([41,0,0],post),
        translate([-41,0,0],post)
    ]);
}


