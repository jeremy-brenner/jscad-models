const res = 16*2;

function main() {
    const posCube = cube({size:[50,50,50], center:[true,true,false]});
    const bump = translate([0,0,3.25],rotate([0,90,0],rotate([0,0,45],diamond(1.25))));
    const bumps = union( iterate(8).map( (i) => radialTranslate(i*360/8,15,bump) ) );
    const topCyl = cylinder({r:3,fn:res, h:3});
    const crossBit = translate([0,-1.5,0],linear_extrude({ center: true, height: 1 }, polygon({ points: [ [0,0],[2,0],[1.5,1], [0.5,1] ] })));
    const cross = scale([2,2,1],union(crossBit, 
      rotate([0,0,90],crossBit),
      rotate([0,0,180],crossBit),
      rotate([0,0,270],crossBit),
      cube({size:[1,2,1], center: true}),
      cube({size:[2,1,1], center: true})
      ));

    const topBit = union(
        translate([0,0,15.5], topCyl),
        translate([0,0,18.5],cylinder({r:2.5,fn:res, h:0.5})),
        translate([0,0,19], topCyl)
        );
    const cutout = cutoutf();
    const cutouts = union( iterate(8).map( (i) =>  radialTranslate(i*360/8+360/16,13, cutout)) );
    const humpRing = torus({ri:0.5,ro:12,fni:res/2,fno:res});
    const humpRings = union( iterate(4).map( (i) => translate([0,0,4],rotate([i*360/8+360/16,90,0],humpRing))));
    const outerRing =  translate([0,0,0.75],torus({ri:0.75,ro:15,fni:res/2,fno:res}));
    const topRing =  translate([0,0,3.5],rotate([0,90,0],torus({ri:1,ro:14,fni:res/2,fno:res})));

    const centerHump = difference( 
        union(
            hump(12),
            humpRings,
            topBit,
            topRing
        ),
        hump(11),
        cylinder({r:2,fn:res, h:30})
    );

    const main = union(
        difference(
            cylinder({r:15,fn:res, h:10}),
            cylinder({r:14,fn:res, h:10}),
            cutouts

        ),
        difference(
            cylinder({r:15,fn:res, h:1}),
            cylinder({r:12,fn:res, h:1})
        ),
        translate([14.5,0,8],rotate([0,90,0],cross)),
        bumps,
    
        centerHump,
        outerRing
        
        );
        
    return intersection(main,posCube);
}

function cutoutf() {
    const smallCyl = rotate([0,90,0],cylinder({r:1.5,fn:res, h:2})); 
    const largeCyl = rotate([0,90,0],cylinder({r:18,fn:res*2, h:2})); 
    const smallCube = cube({size:[2,2.5,2.5], center: [false,true,true]});
    return union(
        translate([0,3.25,6],smallCyl),
        translate([0,-3.25,6],smallCyl),
        translate([0,2.95,7],rotate([30,0,0],smallCube)),
        translate([0,-2.95,7],rotate([-30,0,0],smallCube)),
        translate([0,3.5,10],rotate([-45,0,0],smallCube)),
        translate([0,-3.5,10],rotate([45,0,0],smallCube)),
translate([0,0,5],cube({size:[2,6.5,8], center:[false,true,false]})),
        intersection(
            translate([0,0,22.17],largeCyl), 
            translate([0,-3.75,0],cube({size:[12,7.5,8]}))
        )
    );
}

function diamond(size) {
  return polyhedron({     
    points: [ 
        [size,size,0],
        [size,-size,0],
        [-size,-size,0],
        [-size,size,0], 
        [0,0,size] 
      ],                         
    triangles: [ 
        [0,1,4],
        [1,2,4],
        [2,3,4],
        [3,0,4],
        [1,0,3],
        [2,1,3] 
      ]                 
  });
}

function radialTranslate(angle,distance,obj) {
  const rad = angle * Math.PI/180;
  const x = distance*Math.cos(rad);
  const y = distance*Math.sin(rad);
  return translate([x,y,0],rotate([0,0,angle],obj));
}

function iterate(num) {
    return [...Array(num).keys()];
}

function hump(r) {
    return           union( 
                translate([0,0,4], sphere({r:r, fn:res})), 
                cylinder({r,fn:res, h:4})
            );
}