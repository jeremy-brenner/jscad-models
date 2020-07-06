include('base_peg.jscad');
include('sign_backing.jscad');
include('../lib/seq.jscad');

function main() {
    const backing = signBacking();
const key = difference(
    union(
        cylinder({r:1.4,h:5}),
        translate([0,0,5],sphere({r:1.4}))
    ),
    cube({size:[3,3,7],center:[false,true,false]})
);

const postPost = groovedPost({pr:2.5,ph:80,gr:0.75,gh:79,gc:6})

const angle = 360/6;
const bump = translate([3.5,0,0],rotate([90,0,0],torus({ro: 1, ri:0.75})));
const bumpyCyl = union(
    torus({ ro: 3.5, ri: 1 }),
    ...seq(6).map( i => rotate([0,0,i*angle],bump))
);

const peg = translate([0,0,-2],basePeg());
const pegs = union(
    peg,
    rotate([0,0,180],peg)
)

const postBase = union(
    translate([0,0,1],
        difference(
            cylinder({r:3.5,h:2}),
            translate([0,0,2],bumpyCyl)
        )
    ),
    cylinder({r:4.5,h:1}),
    pegs
)

const postTip = difference(
    scale([1,1,1.3],sphere({r:2.5})),
    translate([0,0,-10],cube({size:[5,5,10], center:[true,true,false]}))
);


const post = union(
    difference(
    union(
        translate([0,0,82],postTip),
        translate([0,0,2],postPost), 
        postBase 
    ),
    translate([1.2,0,102],rotate([-90,0,90],scale([1,1,1.2],backing)))
),
translate([1.2,0,76],key)
)

return post;
    }

function groovedPost({pr,gr,ph,gh,gc}) {
    const groove = postGroove({r:gr,h:gh})
    const angle = 360/gc;
    return difference(
        cylinder({r:pr, h:ph}),
        ...seq(gc).map( i => rotate([0,0,i*angle],translate([pr,0,0],groove)))
    );
}

function postGroove({r,h}) {
    const endCap = sphere({r});
    return union(
        cylinder({r, h:h-r}),
        translate([0,0,h-r],endCap)
    );
}