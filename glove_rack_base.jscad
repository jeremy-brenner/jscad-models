function main() {

  const base = union([
        cylinder({d:60,h:12}),
        translate([12,12,12],sphere({r:8})),
        translate([-12,12,12],sphere({r:8})),
        translate([-12,-12,12],sphere({r:8})),
        translate([12,-12,12],sphere({r:8}))
    ]);

   const hole = cylinder({d:3.5,h:10});

    return difference([
        base,
        translate([15,0,0],hole),
        translate([-15,0,0],hole)
    ]);
}
