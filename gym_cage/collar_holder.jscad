function main() {
    const hook = intersection(
        difference(
            union(
                cylinder({r:6, h:4}),
                translate([0,0,4],cylinder({r:7.5, h:2}))
            ),
            cylinder({r:3,h:6})
        ),
        translate([-7.5,-7.5,0],cube({size:[15,7.5,8]}))
    );

    const bigHook = difference(
        union(
            cylinder({r:8, h:20}),
            translate([0,0,20],cylinder({r:12, h:2}))
        ),
        cylinder({r:6,h:22})
    );


    const plate = translate([-10,0,0],
        union(
            translate([10,0,0],cylinder({r:10,h:2})),
            cube({size:[20,40,2]}),
            translate([10,40,0],cylinder({r:10,h:2}))
        )
    );

    const models = [];
    models.push(rotate([180,0,0],hook));
    models.push(plate);
    models.push(translate([0,40,2],bigHook));

    return union(models);
}