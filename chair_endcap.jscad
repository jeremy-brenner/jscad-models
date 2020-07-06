
function main() {

    const top = intersection(
        difference(sphere({r:25.5/2}),sphere({r:15.5/2})),
        cube({size:[25.5,25.5,25.5/2],center:[true,true,false]})
    );
    const bottomCyl = difference(cylinder({r:17.5/2,h:12}),cylinder({r:15.5/2,h:12}))
   
    const finShape = difference(cylinder({r2:23.5/2,r1:17.5/2,h:3}),cylinder({r:15.5/2,h:3}));
    const fin = difference(finShape, translate([0,0,1], finShape))

    const bottom = union(
        bottomCyl,
        fin,
        translate([0,0,4],fin),
        translate([0,0,8],fin)
    );

    return union(
        top,
        translate([0,0,-12],bottom)
    )
}