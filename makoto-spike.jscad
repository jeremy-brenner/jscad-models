function spike(size) {
  return polyhedron({     
    points: [ 
        [size/2,size/2,0],
        [size/2,-size/2,0],
        [-size/2,-size/2,0],
        [-size/2,size/2,0], 
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

function button(size) {
  return difference(
      union(
          cube({size:[size,size,2],center:[true,true,false]}),
          translate([0,0,2],spike(16))
          ),
    translate([2,2,4],cube({size:[size,size,20],center:[true,true,false]})),
    translate( [2,2,0], cylinder({r: 1, h: 4}) ),  
    translate( [-2,2,0], cylinder({r: 1, h: 4}) ),  
    translate( [2,-2,0], cylinder({r: 1, h: 4}) ),  
    translate( [-2,-2,0], cylinder({r: 1, h: 4}) )
  );
}

function main () {
  return union( 
    translate( [12,0,0],
      difference(
        spike(20),
        spike(16)
      ) 
    ),
    translate( [-12,0,0], button(20) )
  );
}