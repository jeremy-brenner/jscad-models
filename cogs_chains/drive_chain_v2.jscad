include('../threads/threads.jscad');

function main() {
    const plateEnd = union(
            cylinder({r:4,h:1.5}),
            cube({size:[8,5,1.5], center:[true,false,false]})
        );

    const plate = union(
        plateEnd,
        translate([0,10,0],rotate([0,0,180],plateEnd))
    );

    
    const postR = 1.75;
    const flangeR = 2.05;
    const post = union(
        cylinder({r:postR,h:12.5}),
       // cylinder({r1:postR,r2:flangeR,h:0.75}),
        cylinder({r:flangeR,h:0.75}),
        translate([0,0,11.75],cylinder({r2:postR,r1:flangeR,h:0.75}))
    );

    outsidePlateHole = cylinder({r1:1.9,r2:2.1,h:8});

    const outside = difference(
        plate,
        outsidePlateHole,
        translate([0,10,0],outsidePlateHole)
    );

    const ring = difference(
        cylinder({r:2.5,h:6}),
        cylinder({r:2,h:6})
    );

    const insidePlateHole = union(
        cylinder({r:2,h:1.5}),
        translate([0,0,0.5],cylinder({r:2.6,h:1}))
    );

    const inside = union(
        difference(
            plate,
            insidePlateHole,
            translate([0,10,0],cylinder({r:2,h:1.5}))
        ),
        translate([0,10,0.5],ring)
    )
    return union(
        translate([5,0,0], outside),
        translate([-5,0,0], inside),
        translate([-15,0,0], post)
    )
}