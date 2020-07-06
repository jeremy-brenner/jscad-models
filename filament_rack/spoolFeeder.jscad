function main() {
   const holeR = 6.5;
   const barT = 2;
   const sliderR = holeR + barT;
   const bearingPostR = 4.1;
   const bearingPostH = 3.5;
   const bearingPostBufferR = 5.5;
   const bearingPostBufferH = 0.5;
   const holeSeparation = 100;
   const totalDepth = 6;
   const bearingBackingR = 13;

   const bearingPost = union(
       translate([0,0,bearingPostBufferH],cylinder({r:bearingPostR,h:bearingPostH})),
       cylinder({r:bearingPostBufferR,h:bearingPostBufferH})
   )

   const bearingPosts = union(
       bearingPost,
       translate([holeSeparation,0,0],bearingPost)
   )

   const bearingBacking = cylinder({r:bearingBackingR,h:barT});
  
   const backing = union(
       bearingBacking,
       translate([holeSeparation,0,0],bearingBacking),
       translate([0,-bearingBackingR,0],cube({size:[holeSeparation,bearingBackingR,barT]}))
       );

   const sliderBars = difference(
    cube({size:[holeSeparation,sliderR*2,totalDepth]}),
    translate([0,barT,0],cube({size:[holeSeparation,sliderR*2-barT*2,totalDepth]}))
   )

   const slider = difference(
       cylinder({r:sliderR,h:totalDepth}),
       cylinder({r:holeR,h:totalDepth})
   )

   const sliders = union(
    translate([0,-sliderR,0],sliderBars),
    slider,
    translate([holeSeparation,0,0],slider)
   )

   return union(
       sliders,
       translate([0,bearingBackingR+sliderR,0],backing),
       translate([0,bearingBackingR+sliderR,barT],bearingPosts)
   );
}