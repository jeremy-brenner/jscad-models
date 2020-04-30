function main() {
    const quality = 4;
    const r = 4;
    const t = 1.5;
    const h = 9.75;
    const l = 120;
    const w = 30;

    const spike_radius = 0.7;
    const spike_height = 4;
    const row_distance = 7;
    const column_distance = 3;

    const spike_rows = Math.floor((l-5)/row_distance);
    const spike_columns = Math.floor((w-5)/column_distance);
    
    const hinge = union(
        translate([0,0,r],rotate([0,90,0],cylinder({r:r,h:h}))),
        cube({size:[h,r,r]})
    );

    const outsideHinge = union(
        hinge,
        translate([h,0,r],sphere({r:1}))
    )

    const insideHinge = difference(
        hinge,
        translate([h,0,r],sphere({r:1})),
        translate([0,0,r],sphere({r:1}))
    )

    const outsideHinges = union(
        translate([w,0,0],mirror([1,0,0],outsideHinge)),
        translate([0,0,0],outsideHinge)
    );

    const insideLock = difference(
        cube({size:[w,1.5,r]}),
        translate([0,2,r/2],rotate([0,90,0],cylinder({r:1,h:w})))
    )

    const outsideLock = union(
        cube({size:[w,2,r]}),
        translate([0,1.5,0],cube({size:[w,1.5,r*2]})),
        translate([0,2,r+r/2],rotate([0,90,0],cylinder({r:1,h:w})))
    )

    const sidePiece = difference(
        cube({size:[w,l,t]}),
        translate([0,0,r],rotate([0,90,0],cylinder({r:r,h:w})))
    );


    const spike = union(
        cylinder({r:spike_radius,h:spike_height}),
        translate([0,0,spike_height],sphere({r:spike_radius, fn:4*quality}))
    );
    
    const spike_row = union(seq(spike_rows).map( i => translate([0,i*row_distance,0], spike)));
    const spike_grid = translate([w/2,l/2+2,t],center([true,true,false],union(seq(spike_columns).map( i => translate([i*column_distance,i*column_distance%2*row_distance/2,0], spike_row)))));

    const ridge = translate([6.5,0,0],intersection(cube({size:[3,3,1.25], center:[true,true,false]}),sphere({r:1.25, fn:4*quality})));
    const ridgeCount = 24;
    const ridges = translate([0,0,-0.5],union( seq(ridgeCount).map( i => rotate([0,0,i*360/ridgeCount], ridge) ) ));

    const hole = cylinder({r:3.3,h:t});
    const bevel = translate([0,0,t-(t-1)],cylinder({r:3.6,h:100}));

    const cutOuts = union(ridges,hole,bevel);

    const outsideSide = union( outsideHinges, sidePiece, spike_grid, translate([0,l,0],outsideLock));
    const outsideSideRidged = difference(
        outsideSide,
        translate([w/2,l/2+2,0],cutOuts)
    )
    const insideSide = union( translate([10+(10-h)/2,0,0],insideHinge), spike_grid, sidePiece, translate([0,l,0],insideLock));


    return union(
        translate([35,0,0],outsideSideRidged),
        insideSide
    );

    
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}