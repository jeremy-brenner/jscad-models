function main() {
    const p = 10;
    const c = 20;
    const r = p*c/Math.PI/2;
    const holeR = 2.6;
    const cubeW = p - holeR*2;

    const sliceSize = 360/c;
    const onePeg = translate([r+holeR/2,0,0],rotate([90,0,90],peg({w:cubeW,l:3.5,h:cubeW/2})));
    const pegs = seq(c).map(i => rotate([0,0,(i+0.5)*sliceSize],onePeg));
    const hole = translate([r,0,0],
        union(
            cylinder({r:holeR,h:3.5}),
            rotate([0,0,sliceSize/1.5],translate([holeR,0,0],cube({size:[holeR*2,holeR*2,3.5],center:[true,true,false]}))),
            rotate([0,0,-sliceSize/1.5],translate([holeR,0,0],cube({size:[holeR*2,holeR*2,3.5],center:[true,true,false]})))
        )
    );
    const holes = seq(c).map(i => rotate([0,0,i*sliceSize],hole));

    //cylinder({r:1.3,h:3.5})

    const postHole = intersection(
        cylinder({r:2.75,h:3.5}),
        cube({size:[3.8,6,3.5], center:[true,true,false]})
    );

    return difference(
        union(
            cylinder({r:r+holeR/2,h:3.5}),
            ...pegs
        ),
        ...holes,
        postHole
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}
    
function peg({w,l,h}) {
  return union( polyhedron({      // openscad-like (e.g. pyramid)
    points: [ [w/2,l,0],[w/2,0,0],[-w/2,0,0],[-w/2,l,0], // the four points at base
              [0,l/2,h] ],                                  // the apex point 
    triangles: [ [0,1,4],[1,2,4],[2,3,4],[3,0,4],          // each triangle side
                 [1,0,3],[2,1,3] ]                         // two triangles for square base
  }),
    translate([0,0,-h],cube({size:[w,l,h],center:[true,false,false]}))
  );

}