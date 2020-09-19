function main() {
    return rotatorOutside();
}

rotatorOutside = function() {
    const fn = 32*2;
    const rt = 2;
    const h = 10;

    const ir = 20.2;
    const or = ir+rt;

    const pip = translate([ir+0.25,0,3],cube({size:[3,3,5],center:[false,true,false]}));

    const ring = difference(
        cylinder({r:or, h,fn}),
        cylinder({r:ir, h,fn}),
        translate([0,0,h-0.5],cylinder({r1:ir, r2:ir+0.5, h:0.5,fn})),
        translate([0,0,3],cylinder({r:ir+0.75,h:5,fn})),
        pip,
        rotate([0,0,90],pip),
        rotate([0,0,180],pip),
        rotate([0,0,270],pip)
    );

    return ring;
}
