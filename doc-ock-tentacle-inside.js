
const hw = 8;
const ri = 8;
const ro = 4;

const quality = 1;

const fn = 16 * quality;

function main() {
    return scale([0.97, 0.95, 1], section());
}


function section() {
    return difference(
        humps(),
        translate([0, 0.2, 0], scale([0.98, 0.98, 1], humps()))
    );
}

function humps() {
    return scale([3.33, 3.33, 3.33],
        union(
      //      translate([0, 0, -hw * 2], intersection(translate([-15, -5.5, 0], cube([30, 20, hw/2])),hump())),

            translate([0, 0, -hw], hump()),
            hump(),
            translate([0, 0, hw], hump()),
//translate([0, 0, hw * 2], intersection(translate([-15, -5.5, -hw / 2], cube([30, 20, hw/2])),hump())),
         
            /* suckers */
            translate([0, -4, 0], rotate([90, 0, 0], torus({ ri: 2, ro: 5, fni: fn / 2, fno: fn }))),
            translate([0, -4, 0], rotate([90, 0, 0], torus({ ri: 2, ro: 2, fni: fn / 2, fno: fn })))
        )
    );
}

function hump() {
    return difference(
        union(
            intersection(
                translate([-15, -5.5, -hw / 2], cube([30, 20, hw])),
                union(
                    torus({ ri, ro, fni: fn, fno: fn }),
                    translate([ro, 0, 0], rotate([90, 0, 0], cylinder({ r: ri, h: 4, fn }))),
                    translate([-ro, 0, 0], rotate([90, 0, 0], cylinder({ r: ri, h: 4, fn }))),
                    translate([ro, -4, 0], rotate([90, 0, 0], torus({ ri: 1.5, ro: ri - 1.5, fni: fn / 2, fno: fn }))),
                    translate([-ro, -4, 0], rotate([90, 0, 0], torus({ ri: 1.5, ro: ri - 1.5, fni: fn / 2, fno: fn })))
                )
            )
        ),
        translate([20, -3.75, -ro + 1.5], rotate([0, 90, 180], bevel())),
        translate([-20, -3.75, ro - 1.5], rotate([0, 270, 180], bevel()))
    );
}

function bevel() {
    return difference(
        cube([2, 2, 40]),
        cylinder({ r: 2, h: 40, fn: fn })
    );
}
