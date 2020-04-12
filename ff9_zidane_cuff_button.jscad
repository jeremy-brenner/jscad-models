function spike(size) {
    return polyhedron({     
      points: [ 
          [size/2,size/2,0],
          [size/2,-size/2,0],
          [-size/2,-size/2,0],
          [-size/2,size/2,0], 
          [0,0,size/4] 
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
  
  function main () {
      const button_cover = union(
        translate([0,0,0.5],spike(20)),
        cube({size:[20,20,1], center: [true,true,false]}),
        difference(
            cube({size:[20,20,2], center:[true,true,false]}),
            cube({size:[16,16,2], center:[true,true,false]})
          
           )
        );
        
       const button = translate([25,0,0],difference(
         cube({size:[10,10,1.5], center:[true,true,false]}),
         translate([2,2,0],cylinder({r:1,h:10})),
         translate([2,-2,0],cylinder({r:1,h:10})),
         translate([-2,-2,0],cylinder({r:1,h:10})),
         translate([-2,2,0],cylinder({r:1,h:10}))
      ));
      
      
    return union(
        difference(button_cover, cube({size:[10,10,1.5], center:[true,true,false]})),
        button );
     
  }
  
  