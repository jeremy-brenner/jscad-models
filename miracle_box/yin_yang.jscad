function main() {

    const targetR = 97;
    const mainR = 25;
    const cornerR = 3;
    const maxR = mainR+3;
    const centerR = 10 * targetR/maxR;
    const fn = 128;
    const h = 10;
    const t = 2;

    const yin = union(
        difference(
            cylinder({r:centerR,h,fn}),
            translate([0,-centerR,0],cube({size:[centerR,centerR*2,h]})),
            translate([0,centerR/2,0],cylinder({r:centerR/2,h,fn}))
        ),
        translate([0,-centerR/2,0],cylinder({r:centerR/2,h,fn}))
    );
 
    const yinInside = union(
        difference(
            cylinder({r:centerR-t,h,fn}),
            translate([0,-centerR,0],cube({size:[centerR,centerR*2,h]})),
            translate([0,centerR/2,0],cylinder({r:centerR/2+t,h,fn}))
        ),
        translate([0,-centerR/2,0],cylinder({r:centerR/2-t,h,fn}))
    );
    
    return difference(yin,translate([0,0,t],yinInside));
}