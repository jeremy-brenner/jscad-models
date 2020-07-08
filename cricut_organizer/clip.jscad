include('wedge.jscad');

function main() {
  return scale([1,1,50],clip());
}

clip = function() {
    const barW = 16.5;
    const h = 1;
    const t=2;


    const wedgePiece = wedge({size:[h,t,t]});
    return union(
        difference(
            cube({size:[barW+t*2,barW+t*2,h],center:[true,false,false]}),
            cube({size:[barW,barW+t,h], center:[true,false,false]})
        ),
        translate([barW/2-t,0,0],rotate([0,-90,-90],wedgePiece)),
        translate([-barW/2+t,0,0],rotate([0,-90,0],wedgePiece))

    )
}
