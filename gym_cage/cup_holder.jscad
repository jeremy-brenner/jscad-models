include('hook.jscad');

function main() {
    const _hook = hook();
     
    const cupHole = difference(
        union(
            cylinder({r:39.5,h:60}),
            translate([-39.5,0,0],cube({size:[79,39.5,60]}))
        ),
        cylinder({r:37.5,h:60})
    )

    const holder = union(
        _hook,
        translate([0,50,0],_hook),

        //back
        translate([-39.5,-30,-2],cube([79,85,2])),

        translate([0,30,-39.5],rotate([90,0,0],cupHole))

    );

    return holder;
}