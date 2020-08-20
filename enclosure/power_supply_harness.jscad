include('../lib/seq.jscad');

function main() {
    const _harnesses = harnesses();
    return union(
        rotate([-90,0,0],_harnesses.harnessBase),
        translate([0,20,0],rotate([-90,0,0],_harnesses.harnessTop))
    );
}

harnesses = function() {
    const terminals = 9;

    const centerDistance = 9.5; // extremeCenterDistance/(terminals-1);
    const minorTerminalHoleR = 3;
    const majorTerminalHoleR = 3.2;
    const wireHoleR = 2;
    const minorTerminalHoleH = 5;
    const majorTerminalHoleH = 6.5;
    const wireHoleH = 2;
     

    const blockWidth = centerDistance * terminals;
    const blockHeight = majorTerminalHoleR+2

    const block = cube({size:[blockWidth,blockHeight,minorTerminalHoleH+majorTerminalHoleH+wireHoleH], center:[true,false,false]});

    const minorTerminalHole = cube({size:[7.25,minorTerminalHoleR,minorTerminalHoleH*2],center:[true,false,true]});//cylinder({r:minorTerminalHoleR,h:minorTerminalHoleH})
    const majorTerminalHole = translate([0,0,minorTerminalHoleH],cylinder({r:majorTerminalHoleR,h:majorTerminalHoleH}))
    const wireHole = translate([0,0,minorTerminalHoleH+majorTerminalHoleH],cylinder({r:wireHoleR,h:wireHoleH}))
    const terminalHole = union(minorTerminalHole,majorTerminalHole,wireHole)
    const terminalHoles = seq(terminals).map(i => translate([i*centerDistance,0,0],terminalHole))
    const harnessBase = difference(
        block,
        center([true,false,false],union(...terminalHoles))
    );

    const endStop = cube({size:[minorTerminalHoleR*2+2,majorTerminalHoleR+3,2]})
    const endStops = seq(terminals).map(i => translate([i*centerDistance,-1,-2],endStop))
    const harnessTop = union(harnessBase,center([true,false,false],...endStops));

    return {harnessBase,harnessTop,blockHeight,blockWidth};
        
}