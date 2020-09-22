function main() {
    return rotatorInside();
}

rotatorInside = function() {
    const fn = 32*2;
    const rt = 2;
    const h = 11;
    const or = 20;
    const ir = or-rt;

    const cut = translate([0,0,2], union(
        rotate([0,0,-21],translate([5,5,0],cube({size:[or,or,1]}))),
        rotate([0,0,-21],translate([5,5,5],cube({size:[or,or,1]}))),
        rotate([0,0,-6],cube({size:[1,or,6], center:[true,false,false]}))
    ));

    const ring = difference(
        union( 
            translate([0,0,0.5],cylinder({r:or, h:h-0.5, fn})),
            cylinder({r1:or-0.5, r2:or,h:0.5,fn})
        ),
        cylinder({r:ir, h, fn}),

        cut,
        rotate([0,0,90],cut),
        rotate([0,0,180],cut),
        rotate([0,0,270],cut)
    )

    const pip =  translate([or+0.75,0,3],
        difference(
            union(
                cylinder({r:1.5,h:4, fn}),
                translate([-2.25,-1.5,0],cube({size:[2.25,3,4]}))
            ),
            rotate([0,0,60],translate([-1.5,-3.8,0],cube({size:[3,3,4]})))
        )
    );

    const bar = difference(
        cube({size:[1.5,38,11], center:[true,true,false]}),
        translate([0,38/2-2,2],cube({size:[1.5,4,6], center:[true,true,false]})),
        translate([0,-38/2+2,2],cube({size:[1.5,4,6], center:[true,true,false]}))
    )

    const bars = [
        bar, rotate([0,0,90],bar)
    ]

    return union(
        ring,
        pip,
        rotate([0,0,90],pip),
        rotate([0,0,180],pip),
        rotate([0,0,270],pip),
        ...bars

    )
}