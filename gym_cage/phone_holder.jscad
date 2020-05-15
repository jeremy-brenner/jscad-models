function getParameterDefinitions() {
    return [
        { name: 'renderHolder', type: 'checkbox', checked: true, caption: 'Render holder:' },
        { name: 'renderPlugCover', type: 'checkbox', checked: true, caption: 'Render plug cover:' },
    ];
}

function main({renderHolder,renderPlugCover}) {
    const hook = intersection(
        difference(
            union(
                cylinder({r:6, h:4}),
                translate([0,0,4],cylinder({r:7.5, h:2}))
            ),
            cylinder({r:4,h:6})
        ),
        translate([-7.5,-7.5,0],cube({size:[15,7.5,8]}))
    );
    const screwHole = union([
        cylinder({d:2.9,h:10}),
        cylinder({d:3.5,h:4}),
        cylinder({d:8,h:2.5})
    ]);
    
    const plugCover = union([
        translate([0,10,0],cube({size:[10,30,6], center:[true,false,false]})),
        cube({size:[10,50,4], center:[true,false,false]}),
        translate([0,10,0],cube({size:[5,3,7], center:[true,false,false]}))
        ]);
        
    const plugCoverWithHoles = difference([
        plugCover,
        translate([0,5,0],screwHole),
       translate([0,45,0],screwHole),
       translate([0,0,3],cube({size:[8,1,1], center:[true,false,false]}))
        ])
    const plugHole = difference([
        union([
          translate([0,38.5,0],cube({size:[9,11,14], center:[true,false,false]})),
          cube({size:[10,50,12], center:[true,false,false]}),
         ]),
         translate([0,20,0],difference([
              cube({size:[10,3,12], center:[true,false,false]}),
              cube({size:[5,3,11], center:[true,false,false]}),
              ]))
         ]);

    const plugHoleTransformed = translate([20,-42.5,-8],rotate([90,90,180],center([true,true,false],plugHole)));
    const plugCoverHole = translate([10,-48.5,-8],
        rotate([90,90,180],
            center([true,true,false],
                union(
                    plugCover,
                    translate([0,5,0],screwHole),
                    translate([0,45,0],screwHole)
                )
            )
        )
    );

    const stand = union(
        hook,
        translate([0,50,0],hook),

        //back
        translate([-39,-30,-2],cube([78,85,2])),

        //bottom
        translate([-39,-48.5,-16],cube([78,18.5,16])),
        translate([-39,-30,-16],cube([78,5,2])),

        //right
        translate([-41,-48.5,-16],cube([2,103.5,16])),
        translate([-39,-30,-16],cube([5,85,2])),

        //left
        translate([39,-48.5,-16],cube([2,103.5,16])),
        translate([34,-30,-16],cube([5,85,2]))
    );

    const allModels = [];
    if(renderHolder) {
        allModels.push(difference(stand,plugHoleTransformed,plugCoverHole));
    }
    if(renderPlugCover) {
        allModels.push(translate([60,-49.5,0],rotate([-90,180,0],plugCoverWithHoles)))
    }

    return union(allModels);
}