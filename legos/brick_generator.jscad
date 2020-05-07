const unitH = 3.16;
const unitW = 8;
const pegR = 2.5;
const pegH = 2;

function getParameterDefinitions() {
    return [
        { name: 'l', type: 'int', initial: 4, caption: "Block length:" },
        { name: 'w', type: 'int', initial: 2, caption: "Block width:" },
        { name: 'h', type: 'int', initial: 3, caption: "Block height:" }
    ];
}

function main({l,w,h}) {
    const brickL = unitW*l;
    const brickW = unitW*w;
    const brickH = unitH*h;
    
    const holeDiff = ( unitW - pegR*2 );
    const holeL = brickL - holeDiff;
    const holeW = brickW - holeDiff;
    const holeH = brickH - 1;

    const block = difference( 
        cube({size:[brickL,brickW,brickH]}),
        translate([holeDiff/2,holeDiff/2,0],cube({size:[holeL,holeW,holeH]}))
    );

    const _pegs = translate([0,0,brickH],pegs(l,w));

    const _supports = (l > 1 || w > 1) ? supports(l-1,w-1,h) : undefined
    
    return union([block,_pegs,_supports].filter(p=>p));
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
    const support = cylinder({r,h:supportH});
    return rotate([0,0,rotation],union(seq(c).map(x => translate([(x+1)*unitW,offsetY,0],support))))
}

function largeSupports(sl,sw,h) {
    let r = 3.25;
    let t = 0.5;
    const supportH = h*unitH;
    const support = difference(
        cylinder({r,h:supportH}),
        cylinder({r:r-t,h:supportH})
    );

    const supportRow = union(seq(sl).map(x => translate([(x+1)*unitW,0,0],support)));
    return union(seq(sw).map( y => translate([0,(y+1)*unitW,0], supportRow)));
}

function pegs(l,w) {
    const peg = cylinder({r:pegR,h:pegH});
    const pegRow = union(seq(l).map(x => translate([pegOffset(x),0,0],peg)));
    return union(seq(w).map( y => translate([0,pegOffset(y),0], pegRow)));
}

function pegOffset(n) {
    const pegO = unitW/2;
    return unitW * n + pegO;
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}