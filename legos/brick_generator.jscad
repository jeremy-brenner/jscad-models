const unitH = 3.16;
const unitW = 8;
const wallT = 1.5;
const ceilT = 1;

const studR = 2.5;
const studH = 2;

const smallSupportR = 1.5;
const supportBarT = 0.5;

const largeSupportR = 3.125;

const barOffset = unitH-ceilT;

function getParameterDefinitions() {
    return [
        { name: 's', type: 'checkbox', checked: true, caption: 'Studs:' },
        { name: 'l', type: 'int', initial: 4, caption: "Length:" },
        { name: 'w', type: 'int', initial: 2, caption: "Width:" },
        { name: 'h', type: 'int', initial: 3, caption: "Height:" },
        { name: 'round', type:'checkbox', checked: false, caption: 'Round:'}
    ];
}

function main({l,w,h,s,round}) {
    const brickL = unitW*l;
    const brickW = unitW*w;
    const brickH = unitH*h;
    
    const holeL = brickL - wallT*2;
    const holeW = brickW - wallT*2;
    const holeH = brickH - ceilT;

    const block = difference( 
        cube({size:[brickL,brickW,brickH]}),
        translate([wallT,wallT,0],cube({size:[holeL,holeW,holeH]}))
    );

    const _studs = (s) ? translate([0,0,brickH],studs(l,w)): undefined;

    const _supports = (l > 1 || w > 1) ? supports(l-1,w-1,brickH) : undefined
    
    const brick = union([block,_studs,_supports].filter(p=>p));
    if(round) {
        const largestD = (brickL>brickW) ? brickL : brickW;
        return intersection(
            brick,
            translate([brickL/2,brickW/2,0],cylinder({r:largestD/2, h:brickH+studH}))
        );
    }
    return brick;
}

function supports(sl,sw,sh) {
    return (sl > 0 && sw > 0) ? largeSupports(sl,sw,sh) : smallSupports(sl,sw,sh);
}

function smallSupports(sl,sw,sh) {
    const c = (sl > 0) ? sl : sw;
    const rotation = (sl > 0) ? 0 : 90;
    const offsetY = (sl > 0) ? unitW/2 : -unitW/2;
    const barH = sh-barOffset;

    const support = union(
        cylinder({r:smallSupportR,h:sh}),
        translate([-supportBarT/2,-unitW/2,barOffset],cube({size:[supportBarT,unitW,barH]}))
    );
    return rotate([0,0,rotation],union(seq(c).map(x => translate([(x+1)*unitW,offsetY,0],support))))
}

function largeSupports(sl,sw,sh) {
    const barH = sh-barOffset;
    const support = union(
        cylinder({r:largeSupportR,h:sh}),
        translate([-supportBarT/2,-unitW,barOffset],cube({size:[supportBarT,unitW*2,barH]})),
        translate([-unitW,-supportBarT/2,barOffset],cube({size:[unitW*2,supportBarT,barH]}))
    )
    const supportHole = cylinder({r:studR,h:sh});

    return translate([unitW,unitW,0],
        difference(
            gridOf(support,sl,sw),
            gridOf(supportHole,sl,sw)
        )
    );
}

function gridOf(object,xl,yl) {
    const objectRow = union(seq(xl).map(x => translate([x*unitW,0,0],object)));
    return union(seq(yl).map( y => translate([0,y*unitW,0], objectRow)));
}

function studs(l,w) {
    const stud = cylinder({r:studR,h:studH});
    return translate([unitW/2,unitW/2,0],gridOf(stud,l,w));
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}