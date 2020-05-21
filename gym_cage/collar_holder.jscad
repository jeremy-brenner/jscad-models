include('../threads/threads.jscad');

function main() {
    const threadR = 2.4;
    const backPieceThreads = threads({r:threadR,h:17,fn:32,p:1});
    const backPiece = union(
        intersection(
            cube({size:[22,14,2], center:[true,true,false]}),
            cylinder({r:11,h:2})
        ),
        translate([0,0,2],rotate([0,0,90],cylinder({r:3,h:10, fn:6}))),
        translate([0,0,12],cylinder({r:backPieceThreads.properties.minR,h:17})),
        translate([0,0,12],backPieceThreads)
    );

    const post = difference(
        union(
            cylinder({r:8.25, h:2}),
            translate([0,0,2],cylinder({r:10, h:20}))
        ),
        cylinder({r:3.2,h:5, fn:6}),
        translate([0,0,5],cylinder({r:6,h:17}))
    );
    
    const nutThreads = threads({r:threadR+0.2,h:15,fn:32,p:1,external:false});
    const nut = union(
            difference(
                union(
                cylinder({r:16, h:5, fn:6}),
                cylinder({r:5.8, h:15})
                ),
            cylinder({r:nutThreads.properties.maxR,h:15,fn:32})
        ),
        nutThreads
    );

    const models = [];
    models.push(translate([0,-30,0],nut));
    models.push(backPiece);
    models.push(translate([0,20,0],post));

    return union(models);
}