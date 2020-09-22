function main() {


    
    const baseHeight = 45;
    const postHeight = 33;
    const postW = 12.8;

    const mount = difference(
        cylinder({r:17,h:31.5}),
        cylinder({r:11,h:31.5}),
        cube({size:[27,1.5,31.5], center:[true,true,false]}),
        cube({size:[1.5,27,31.5], center:[true,true,false]}),
        cube({size:[17*2,13,5], center:[true,true,false]}),
        cube({size:[13,17*2,5], center:[true,true,false]})
    );


    const trough = translate([25,0,-20],
        union(
            cylinder({r:6.5,h:baseHeight*2}),
            cube({size:[13,13,baseHeight*2],center:[false,true,false]})
        )
    );

    const base = difference(
          cylinder({r:17,h:baseHeight}),
          rotate([0,-30,0],trough),
          rotate([0,-30,90],trough),
          rotate([0,-30,180],trough),
          rotate([0,-30,270],trough)
        );

        
    const postGroove = translate([postW/2-0.5,-postW/2,0],rotate([0,45,0],cube({size:[1,postW,1]})));
    const post = rotate([0,0,45],difference(
        cube({size:[postW,postW,postHeight], center:[true,true,false]}),
        postGroove,
       rotate([0,0,90], postGroove ),
       rotate([0,0,180], postGroove ),
       rotate([0,0,270], postGroove )

    ));

    return union(
        mount,
        translate([0,0,-baseHeight],cylinder({r:4.5, h:10+baseHeight})),
        translate([0,0,-baseHeight],base),
        translate([0,0,-baseHeight-postHeight],post)
    )
}