function main() {
    const targetR = 97;
    const mainR = 25;
    const cornerR = 3;
    const maxR = mainR+3;
    const centerR = 10;
    const h = 10;
    const t = 2;
    const sliceDeg = 360/5
    
    const corner = translate([-mainR+cornerR+0.2,-cornerR,0],difference(
        translate([-cornerR*3,0,0],cube({size:[cornerR*3,cornerR*3,h]})),
        cylinder({r:cornerR,h,fn:64})
    ));

    
    const slicer = translate([-maxR,0,0],cube({size:[maxR*2,maxR*2,h]}));
    
    const cstart = sliceDeg-14;
    const outerCut = 
    union(
        difference(
            cylinder({r:maxR,h,fn:64}),
            cylinder({r:mainR,h,fn:64}),
            slicer,
            rotate([0,0,180+(cstart)/2], slicer)
        ),
        rotate([0,0,(cstart)/2],translate([-maxR-1,0,0],cylinder({r:4,h,fn:64})))
    );
    
   // return outerCut;
    const half = difference(
        cylinder({r:maxR,h,fn:64}),
        cylinder({r:centerR,h,fn:64}),
        outerCut,
        slicer,
        rotate([0,0,180+sliceDeg/2], slicer),
        corner
    )
    
  //  return half;
    
    const rad = sliceDeg/2 * Math.PI/180;
    const x = Math.sin(rad);
    const y = Math.cos(rad);

    const whole = center([true,true,false],union(
        half,
        mirror([-x,y,0], half)
    ));
    
    const scaled = scale([targetR/maxR,targetR/maxR,1],whole);
    
    const hs = (targetR-t*2)/targetR;
    const hollow = difference(
        scaled,
        translate([0,0,t],scale([hs,hs,1],scaled))
    )
    
    return hollow
}