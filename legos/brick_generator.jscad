const unitH = 3.16;
const unitW = 8;
const studR = 2.5;
const studH = 2;

const smallSupportR = 1.5;
const supportBarT = 0.5;

const largeSupportR = 3.25;
const largeSupportT = 0.5;

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
    const c = (sl > 0) ? sl : sw;
    const rotation = (sl > 0) ? 0 : 90;
    const offsetY = (sl > 0) ? unitW/2 : -unitW/2;
    const supportH = h*unitH;
    const support = union(
        [
            cylinder({r:smallSupportR,h:supportH}),
            (h>1) ? translate([-supportBarT/2,-unitW/2,studH],cube({size:[supportBarT,unitW,h*unitH-studH]})): undefined
        ].filter(o=>o)
    );
    return rotate([0,0,rotation],union(seq(c).map(x => translate([(x+1)*unitW,offsetY,0],support))))
}

function largeSupports(sl,sw,h) {
    const supportH = h*unitH;
    const support = union(
        cylinder({r:largeSupportR,h:supportH}),
        translate([-supportBarT/2,-unitW,studH],cube({size:[supportBarT,unitW*2,h*unitH-studH]})),
        translate([-unitW,-supportBarT/2,studH],cube({size:[unitW*2,supportBarT,h*unitH-studH]}))
    )
    const supportHole = cylinder({r:largeSupportR-largeSupportT,h:supportH});

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