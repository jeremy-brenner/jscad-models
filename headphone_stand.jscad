


function main() {
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
          translate([0,28.5,0],cube({size:[9,11,14], center:[true,false,false]})),
          cube({size:[10,40,12], center:[true,false,false]}),
         ]),
         translate([0,10,0],difference([
              cube({size:[10,3,12], center:[true,false,false]}),
              cube({size:[5,3,11], center:[true,false,false]}),
              ]))
        
         ]);
         
    const cradleRail = union([
        translate([0,0,20],cube({size:[5,70,3]})),
       translate([0,0,23],rotate([-10,0,0],cube({size:[5,20,3.5]}))),
       translate([0,63.2,19.8],rotate([25,0,0],cube({size:[5,7.5,3.5]}))),
 ]);
 
    const standBody = union([
       cube({size:[20,70,20], center:[true,false,false]}),
       translate([-10,0,0],cradleRail)
    ]);
    const stand = difference([
       standBody,
       translate([0,0,6],plugHole),
       plugCover,
       translate([0,5,0],screwHole),
       translate([0,45,0],screwHole),
    ]);
    
    
    const baseBeam = rotate([0,0,16],cube({size:[147,10,2], center:[true,true,false]}));
    
    const fullBase =  union([
        translate([-75,0,0],rotate([0,0,-10],center([true,true,false],stand))),
        translate([75,0,0],rotate([0,0,190],center([true,true,false],mirror([0,1,0],standBody)))),
        baseBeam,
        mirror([1,0,0],baseBeam)
        ]);

     return fullBase;
 //      return plugCoverWithHoles;   
}
