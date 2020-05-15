hook = function() {
    return intersection(
        difference(
            union(
                cylinder({r:6, h:4}),
                translate([0,0,4],cylinder({r:7.5, h:2}))
            ),
            cylinder({r:3,h:6})
        ),
        translate([-7.5,-7.5,0],cube({size:[15,7.5,8]}))
    );
}

function main() {
    return hook();
}