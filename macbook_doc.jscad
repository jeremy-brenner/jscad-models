const boxDepth = 14;
const boxLength = 50;
const boxWidth = 75;

function main() {
    const mdp = center([true,false,true],union([
        cube({size:[12,19,9], center:[true,false,false]}),
        translate([0,0,4.5],rotate([-90,0,0],cylinder({d:7, h:26}))),
        translate([0,0,4.5],rotate([-90,0,0],cylinder({d:5.25, h:boxLength})))
    ]));
    
    const usb = union([
         cube({size:[16,23,8.75],center:[true,false,true]}),
         cube({size:[12,31,8.75],center:[true,false,true]}),
         rotate([-90,0,0],cylinder({d:8, h:38})),
         rotate([-90,0,0],cylinder({d:5.5, h:boxLength}))
    ]);
    const power = union([
        cube({size:[17,11,5.5], center:[true,false,true]}),
        rotate([-90,0,0],cylinder({d:5, h:23.5})),
        rotate([-90,0,0],cylinder({d:3.25, h:boxLength}))
    ]);
    
    const allPlugs = center([true,true,true],union(
        power,
        translate([18.5,0,0],mdp),
        translate([32.5,0,0],mdp),
        translate([49,0,0],usb) 
        ));
        
    const recessSeparation = 7;
    const recessDepth = ( boxDepth - recessSeparation ) / 2;

    const screwHole = center(true,union(
        cylinder({d:3.5,h:boxDepth}),
        cylinder({d:6.5,h:recessDepth,fn:6}),
        translate([0,0,recessSeparation+recessDepth],cylinder({d:6.25,h:recessDepth}))
        ));
        
    const allScrewHoles = union(
        translate([15.5,1,0],screwHole),
        translate([-15.5,1,0],screwHole)
        )
        
    const plugBox = difference(
        cube({size:[boxWidth,boxLength,boxDepth], center:true}),
        allPlugs,
        allScrewHoles,
        translate([boxWidth/2+17,0,0],cylinder({d:40,h:boxDepth, center:true})),
        translate([boxWidth/-2-17,0,0],cylinder({d:40,h:boxDepth, center:true}))
        );

    
    const piece1 = intersection(plugBox, cube({size:[boxWidth,boxLength,boxDepth/2], center:[true,true,false]}));
    const piece2 = intersection(plugBox, translate([0,0,boxDepth/-2],cube({size:[boxWidth,boxLength,boxDepth/2], center:[true,true,false]})));
    
    return union(
        piece1,
        translate([0,boxLength + 2,0],rotate([0,180,180],piece2))
    );
}
