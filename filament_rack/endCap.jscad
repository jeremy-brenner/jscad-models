function getParameterDefinitions() {
    return [
        { name: 'shape', type: 'choice', values: ['bottomCap', 'topCap', 'postCoupler',  'post', 'postTest', 'middleCap'], captions: ['bottomCap', 'topCap', 'postCoupler',  'post', 'postTest', 'middleCap'], initial: 'square', caption: 'Shape:'}, 
    ];
  }

function main({shape}) {
    const capDepth = 12;
    const holeDepth = 10;
    const holeSeparation = 100;
    const holeR = 6;
    const barT = 2;
    const humpR = holeR+barT;
    const postPegH = 20;
    const postH = 110;
    const couplerCenterH = 10;

    const hole = cylinder({r:holeR,h:holeDepth});
    const holes = union(
        translate([0,0,0],hole),
        translate([holeSeparation,0,0],hole)
    );
    const hump = cylinder({r:humpR,h:capDepth});
    const humps = union(
        translate([0,0,0],hump),
        translate([holeSeparation,0,0],hump)
    )
    // const topBars = difference(
    //     cube({size:[holeSeparation,humpR*2,capDepth]}),
    //     translate([0,barT,0],cube({size:[holeSeparation,humpR*2-barT*2,capDepth]}))
    // )
    const topBars = translate([-humpR,0,0],cube({size:[holeSeparation+humpR*2,humpR*2,capDepth]}));

    
    const supportWidth = humpR*Math.sqrt(2)*2;

    const supportCutoutWidth = (humpR-barT)*Math.sqrt(2)*2;
    
    const support = rotate([-90,180,0],
        translate([-humpR,0,-humpR],
            difference(
                center([true,false,false],square([supportWidth,capDepth])).extrude({offset: [30,0,30]}),
         //       center([true,false,false],square([supportCutoutWidth,capDepth])).extrude({offset: [30-barT,0,30-barT]}),
                rotate([0,-135,0],cube({size:[supportWidth,capDepth,supportWidth],center:[true,false,true]})))
            )
        );

    const postPeg = cube({size:[holeR*2,-postPegH,capDepth-barT*2]})

    const capConnector = translate([-holeR,-humpR,barT],union(
        postPeg,
        cube({size:[holeR*2,humpR,capDepth-barT*2]})
    ));

    const capConnectors = union(
        capConnector,
        translate([holeSeparation,0,0],capConnector)
    )
    const postCoupler = union(
        postPeg,
        translate([-barT,-postPegH-couplerCenterH,-barT],cube({size:[humpR*2,couplerCenterH,capDepth]})),
        translate([0,-postPegH-couplerCenterH,0],postPeg)
    )

    const postHoleBuffer = 0.4;

    const postHole = translate(
        [humpR-holeR-postHoleBuffer/2,0,barT-postHoleBuffer/2],
        cube({size:[
            holeR*2+postHoleBuffer,
            postPegH+postHoleBuffer,
            capDepth-barT*2+postHoleBuffer]})
    );
    
    const post = difference(
        cube({size:[humpR*2,postH,capDepth]}),
        postHole,
        translate([0,postH-postPegH-0.4,0],postHole)
    );

    const postTest = difference(
        cube({size:[humpR*2,postPegH+2,capDepth]}),
        postHole
    );

    const bottomCap = difference(
        union(
            humps,
            support,
            translate([holeSeparation,0,0],mirror([90,0,0],support)),
            translate([0,-humpR,0],topBars),
            capConnectors
        ),
        holes
    );

    const topCap = difference(
        union(
            humps,
            translate([0,-humpR,0],topBars),
            capConnectors
        ),
        holes
    )

    const middleCap =  difference(
        union(
            humps,
            translate([0,-humpR,0],topBars),
            capConnectors,
            translate([0,humpR+postPegH,0],capConnectors)
        ),
        holes
    )

    if(shape == 'bottomCap') {
        return bottomCap
    }
    if(shape == 'middleCap') {
        return middleCap
      }
    if(shape == 'topCap') {
      return topCap
    }
    if(shape == 'postCoupler') {
       return postCoupler
    }
    if(shape == 'post') {
       return post
    }
    if(shape == 'postTest') {
       return postTest
    }

    
}