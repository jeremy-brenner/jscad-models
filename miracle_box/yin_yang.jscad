function main() {

    const targetR = 97;
    const mainR = 25;
    const cornerR = 3;
    const maxR = mainR+3;
    const centerR = 10 * targetR/maxR;
    
    const h = 10;
    const t = 2;

    const yin = union(
        difference(
            cylinder({r:centerR,h}),
            translate([0,-centerR,0],cube({size:[centerR,centerR*2,h]})),
            translate([0,centerR/2,0],cylinder({r:centerR/2,h}))
        ),
        translate([0,-centerR/2,0],cylinder({r:centerR/2,h}))
    );
 
    const yinInside = union(
        difference(
            cylinder({r:centerR-t,h}),
            translate([0,-centerR,0],cube({size:[centerR,centerR*2,h]})),
            translate([0,centerR/2,0],cylinder({r:centerR/2+t,h}))
        ),
        translate([0,-centerR/2,0],cylinder({r:centerR/2-t,h}))
    );
    
    return difference(yin,translate([0,0,t],yinInside));
}