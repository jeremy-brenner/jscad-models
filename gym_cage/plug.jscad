function main() {

    const base = translate([0,0,-1.5],cube({size:[20,20,1.5],center:[true,true,false]}));

    return union(plug(),base);
}

plug = function() {
    const r = 8.25;
    const fr = r+0.75;
    const fn = 64;
    const plug = union(
        cylinder({r,h:4,fn}),
        translate([0,0,4],cylinder({r2:r,r1:fr,h:2,fn})) 
    )

    const cutT = 1.5;

    return difference(
        plug,
        cube({size:[cutT,fr*2,6], center:[true,true,false]}),
        cube({size:[fr*2,cutT,6], center:[true,true,false]}),
        cylinder({r1:r-1.5,r2:r-2.5,h:6,fn})
    );

}