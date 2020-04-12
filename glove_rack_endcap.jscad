function main() {
    return difference([
        union([
            cylinder({d:6.5,h:12}),
            translate([0,0,12],sphere({r:3}))
        ]),
        cylinder({d:3.5,h:10})
    ]);
}