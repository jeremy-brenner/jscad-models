
include('clip.jscad');


function main() {
    const cd = 6
    const sectionW = 170/cd;

      const tool_hole = union(
        cylinder({d:16.5, h:2}),
        cylinder({r1:12.5/2, r2:16.5/2, h:45}),
        translate([0,0,45],sphere({r:16.5/2})),
        cube({size:[12.5,20,30], center:[true,false,false]}),
        translate([0,5,35],cube({size:[sectionW,25,5], center:[true,true,false]})),
        translate([-sectionW/2,-7.5,5],wedge({size:[sectionW,25,30]}))
    );

    const tool_holder = translate([0,0,55],rotate([180,0,0], difference(
        translate([0,-12.5,0],cube({size:[sectionW,25,55], center:[true,false,false]})),
        tool_hole
    )));

    const all_tool_holders = union( seq(6).map( i => translate([170/6*i,0,0],tool_holder)) );

    const tip_peg = intersection(
        cylinder({r:3.5,h:6}),
        rotate([0,0,45],cube({size:[6,7,6], center:[true,true,false]}))
    );

    const tall_tip_peg = union(
        translate([0,0,6],tip_peg),
        cylinder({r:6,h:6})
    )

    const cubby = translate([0,0,57],rotate([180,0,0],difference(
        cube({size:[170,27,67], center:[true,true,false]}),
        cube({size:[168,25,65], center:[true,true,false]}),
        translate([0,0,10],mirror([0,0,1],wedge({size:[170,27,10], center:[true,true,false]})))
    )));

    const dividedCubby = center([true,false,false],translate([0,0,57],rotate([180,0,0],difference(
        cube({size:[170,27,67], center:[false,true,false]}),
        ...seq(cd).map( i => translate([i*170/cd,0,0],cube({size:[170/cd-1,25,65], center:[false,true,false]}))),
        translate([0,0,10],mirror([0,0,1],wedge({size:[170,27,10], center:[false,true,false]})))
    ))));

    const all_cubbies = union(
        cubby,
        translate([0,27,10],cubby),
        translate([0,54,20],dividedCubby)
        );

    const side_piece_h = 97;
    const side_pieces = translate([0,0,side_piece_h],rotate([180,0,0],difference(
        union(
            difference(
                union(
                    translate([0,0,0],scale([0.65,1,1],cylinder({r:27*2, h:side_piece_h}))),
                    translate([0,-27*2,0],cube({size:[27*2*0.65,27*2,side_piece_h]}))
                ),
                 union(
                   translate([0,0,0],scale([0.65,1,1],cylinder({r:27*2-1, h:side_piece_h-1}))),
                   translate([0,-27*2+1,0],cube({size:[27*2*0.65-1,27*2,side_piece_h-1]}))
                 )
            ),
            cube({size:[2,27*4,side_piece_h], center:[true,true,false]})
        ),
       translate([0,0,40],mirror([0,0,1],wedge({size:[27*4,27*4,40], center:[true,true,false]})))
    )));
    
     const right_side_piece = intersection(
         side_pieces,
         cube({size:[27*2,27*4,side_piece_h], center:[false,true,false]})
     );

     const left_side_piece = mirror([1,0,0], right_side_piece);

    // return left_side_piece;

const pegRack = center([true,true,false],union(
    cube({size:[sectionW*5,27,6]}),
    translate([0,sectionW,0],intersection(
        cylinder({r:sectionW,h:6}),
        translate([-sectionW,-sectionW,0],cube({size:[sectionW,sectionW,6]}))
    )),
    seq(6).map(i => translate([i*sectionW-sectionW/2,27*0.66,6],tall_tip_peg) ),
    seq(5).map(i => translate([i*sectionW,27*0.33,0],tall_tip_peg) )
))


    return union(
        all_cubbies,
        translate([-170/2+1,27/2,-20],left_side_piece),
        translate([0,-26,-20],center([true,true,false],all_tool_holders)),
        translate([0,-50,-20],pegRack),
        translate([-170/2+10.25-22,88,-20],scale([1,1,side_piece_h-30],rotate([0,0,180],clip()))),
        translate([0,67.5,76],cube({size:[170,1,1],center:[true,false,false]}))
    );
  

  

}


function wedge(options) {
    const size = options.size;
    return center(options.center, polyhedron({
        points: [
          [0, 0, size[2]], [0, size[1], size[2]], [0, size[1], 0],
          [size[0], 0, size[2]], [size[0], size[1], size[2]], [size[0], size[1], 0],
        ],
        triangles: [
          [2, 1, 0],[4,1,2],[2,5,4],[0,1,4],[0,4,3],
          [3, 4, 5],[0,3,5],[5,2,0]
        ]
      }));
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}