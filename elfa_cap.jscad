include('lib/wedge.jscad');

function main() {
    //10x20
     //8x18
    
    const cap = difference(
        cube({size:[10,20,20]}),
        translate([1,1,0],cube({size:[8,18,18]}))
    );
    const shelf = difference(
          translate([0,0,0],cube({size:[11,22,10]})),
          translate([0,0,2],cube({size:[10,21,10]})),
          translate([0,20,2],rotate([-90,0,0],wedge({size:[12,2,2]}))),
          translate([10,22,1],rotate([-90,0,-90],wedge({size:[22,1,1]})))
        );

    return translate([0,0,-20],union(
       cap, 
        translate([0,0,18],shelf)
    ));
}