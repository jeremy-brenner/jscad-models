include('../threads/threads.jscad');


function getParameterDefinitions() {
    return [
        { name: 'hr', type: 'number', initial: 12, caption: "Hole Radius", step: 0.5 },
        { name: 'hd', type: 'number', initial: 50, caption: "Hole Depth", step: 0.5 },
    ];
}

function main({hr,hd}) {
    const p = 1.5;
    const looseness = 0.1;
    const fn = 64;
    const cr = hr + 6;
    const tr = hr - 0.25*p;
    const ctr = tr+looseness;
    const ch = 3;
    const th = 4;
    const uh = hd-(th-ch);

    const cap = union(
        translate([0,0,ch/2],cylinder({r:cr,h:ch/2,fn})),
        cylinder({r1:cr-ch/2,r2:cr,h:ch/2,fn})
    );


    const maleThreads = threads({r:tr,h:th,p,fn});
    const male = difference(
        union(
            cap,
            translate([0,0,ch],cylinder({r:hr,h:uh,fn})),
            translate([0,0,uh+ch],union(maleThreads,cylinder({r:maleThreads.properties.minR,h:th,fn})))
        ),
        cylinder({r:hr-2,h:hd+ch*2,fn})
    )

    const femaleThreads = threads({r:ctr,h:ch,p, fn, external:false});
    const female = union(
        difference(
            cap,
            cylinder({r:femaleThreads.properties.maxR, h:ch, fn})
        ),
        femaleThreads
    );

    return union(
        translate([cr+1,0,0], male),
        translate([(cr+1)*-1,0,0], female)
    )
}