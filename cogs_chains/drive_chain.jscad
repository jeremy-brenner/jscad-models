include('../threads/threads.jscad');

function main() {

    const plateRise = intersection(
        translate([0,1,2],rotate([90,0,0],center([true,false,false],square([8,2.5]).extrude({offset: [0,-3,3]})))),
        cube({size:[9,9,3.25],center:[true,true,false]})
    )

    const plateEnd = union(
            cylinder({r:4,h:1.5}),
            cube({size:[8,4,1.5], center:[true,false,false]})
        );

    const plateEndHole = difference(
        plateEnd,
        cylinder({r:2.7,h:1.5})
    );

    const plate = union(
        plateEnd,
        translate([0,5.5,0],plateRise),
        translate([0,10,1.75],rotate([0,0,180],plateEndHole))
    );

    const postMale = difference(
        union(
            cylinder({r:1.5,h:8}),
            translate([0,0,7.75],torus({ro:1.5,ri:0.125}) )
        ),
        translate([0,0,5],cube({size:[10,0.5,3], center:[true,true,false]}))
    );

    const postFemale = difference(
        cylinder({r:2.5,h:8}),
        cylinder({r:1.6,h:8}),
        translate([0,0,0.3],torus({ro:1.5,ri:0.15}))
    );

    const male = union(
         translate([0,0,1.5],postMale),
         plate
    )

    const female = union(
        translate([0,0,1.5],postFemale),
        plate
    )
    return union(
        translate([5,0,0], male),
        translate([-5,0,0], female)
    )
}