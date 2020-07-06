include('hallownest_logo.jscad');
include('sign_backing.jscad');
include('../lib/seq.jscad');

function main() {


    const backing = signBacking();
    

    const sign = union( 
        backing,
        translate([0,0,-1],scale([15,15,15],rotate([90,0,0],hallownestLogo())))
    );
    return sign;
    
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