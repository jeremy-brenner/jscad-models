const unitH = 3.16;
const unitW = 8;
const studR = 2.5;
const studH = 2;

function getParameterDefinitions() {
    return [
        { name: 's', type: 'checkbox', checked: true, caption: 'Studs:' },
        { name: 'l', type: 'int', initial: 4, caption: "Length:" },
        { name: 'w', type: 'int', initial: 2, caption: "Width:" },
        { name: 'h', type: 'int', initial: 3, caption: "Height:" }
    ];
}

function main({l,w,h,s}) {
    const brickL = unitW*l;
    const brickW = unitW*w;
    const brickH = unitH*h;
    
    const holeDiff = ( unitW - studR*2 );
    const holeL = brickL - holeDiff;
    const holeW = brickW - holeDiff;
    const holeH = brickH - 1;

    const block = difference( 
        cube({size:[brickL,brickW,brickH]}),
        translate([holeDiff/2,holeDiff/2,0],cube({size:[holeL,holeW,holeH]}))
    );

    const _studs = (s) ? translate([0,0,brickH],studs(l,w)): undefined;

    const _supports = (l > 1 || w > 1) ? supports(l-1,w-1,h) : undefined
    
    return union([block,_studs,_supports].filter(p=>p));
}

function supports(sl,sw,h) {
    return (sl > 0 && sw > 0) ? largeSupports(sl,sw,h) : smallSupports(sl,sw,h);
}

function smallSupports(sl,sw,h) {
    let r = 1.5;
    const c = (sl > 0) ? sl : sw;
    const rotation = (sl > 0) ? 0 : 90;
    const offsetY = (sl > 0) ? unitW/2 : -unitW/2;
    const supportH = h*unitH;
    const support = union(
        [
            cylinder({r,h:supportH}),
            (h>1) ? translate([-0.25,-unitW/2,studH],cube({size:[0.5,unitW,h*unitH-studH]})): undefined
        ].filter(o=>o)
    );
    return rotate([0,0,rotation],union(seq(c).map(x => translate([(x+1)*unitW,offsetY,0],support))))
}

function largeSupports(sl,sw,h) {
    let r = 3.25;
    let t = 0.5;
    const supportH = h*unitH;
    const support = union(
        cylinder({r,h:supportH}),
        translate([-0.25,-unitW,studH],cube({size:[0.5,unitW*2,h*unitH-studH]})),
        translate([-unitW,-0.25,studH],cube({size:[unitW*2,0.5,h*unitH-studH]}))
    )
    const supportHole = cylinder({r:r-t,h:supportH});

    const supportRow = union(seq(sl).map(x => translate([(x+1)*unitW,0,0],support)));
    const supportGrid = union(seq(sw).map( y => translate([0,(y+1)*unitW,0], supportRow)));

    const holeRow = union(seq(sl).map(x => translate([(x+1)*unitW,0,0],supportHole)));
    const holeGrid = union(seq(sw).map( y => translate([0,(y+1)*unitW,0], holeRow)));

    return difference(supportGrid,holeGrid);
}

function studs(l,w) {
    const stud = cylinder({r:studR,h:studH});
    const studRow = union(seq(l).map(x => translate([studOffset(x),0,0],stud)));
    return union(seq(w).map( y => translate([0,studOffset(y),0], studRow)));
}

function studOffset(n) {
    const studO = unitW/2;
    return unitW * n + studO;
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}