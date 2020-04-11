const heigth = 50;
const thickness = 2;

function main() {
    const box = difference([
        cube({size:[90,55,height], center:[true,true,false]}),
        cube({size:[86,51,height-thickness], center:[true,true,false]}),
        translate([0,13.75,height-20],rotate([0,90,0],cylinder({r:6,h:45}))),
        translate([0,-13.75,height-20],rotate([0,90,0],cylinder({r:6,h:45}))),
        translate([25,10,0],cylinder({r:2.5,h:height})),
        translate([-25,10,0],cylinder({r:2.5,h:height})),
        translate([25,-10,0],cylinder({r:2.5,h:height})),
        translate([-25,-10,0],cylinder({r:2.5,h:height})),
    ]);
    const post = difference([
            cylinder({r:3,h:height}),
            cylinder({r:1.4,h:height}),
    ]);
    return union([
        box,
        translate([41,0,0],post),
        translate([-41,0,0],post)
    ]);
}


