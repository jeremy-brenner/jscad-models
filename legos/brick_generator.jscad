const unitH = 3.16;
const unitW = 8;
const wallT = 1.5;
const ceilT = 1;

const bottomBevelH = 2.5;
const bottomBevelT = 1;

const studR = 2.5;
const studH = 2;
const studHoleR = 1.625;

const smallSupportR = 1.5;
const supportBarT = 0.5;

const largeSupportR = 3.125;

const barOffset = unitH-ceilT;

function getParameterDefinitions() {
    return [
        { name: 'l', type: 'int', initial: 4, caption: "Length:" },
        { name: 'w', type: 'int', initial: 2, caption: "Width:" },
        { name: 'h', type: 'int', initial: 3, caption: "Height:" },
        { name: 'studStyle', type: 'choice', values: ['normal', 'open', 'none'], captions: ['Normal', 'Open', 'None'], initial: 'normal', caption: 'Studs:'},
        { name: 'holesUnderStuds', type: 'checkbox', checked: false, caption: 'Holes under studs:' },
        { name: 'shape', type: 'choice', values: ['square', 'round', 'quarter'], captions: ['Square', 'Round', 'Quarter Round'], initial: 'square', caption: 'Shape:'},
        { name: 'bottomBevel', type: 'checkbox', checked: false, caption: 'Bottom bevel:' },
    ];
}

function main({l,w,h,studStyle,shape,holesUnderStuds,bottomBevel}) {
    const brickL = unitW*l;
    const brickW = unitW*w;
    const brickH = unitH*h;
    
    const holeL = brickL - wallT*2;
    const holeW = brickW - wallT*2;
    const holeH = brickH - ceilT;

    const hullSubtractors = [studs(l,w)];
 
    if(holesUnderStuds) {
        hullSubtractors.push(translate([0,0,holeH],studs(l,w,studHoleR,ceilT)));
    }

    if(studStyle =='open') {
        hullSubtractors.push(translate([0,0,brickH],studs(l,w,studHoleR)));
    }
    
    const bb = difference(
        block(brickL,brickW,bottomBevelH,shape),
        translate([bottomBevelT,bottomBevelT,0], block(brickL-bottomBevelT*2,brickW-bottomBevelT*2,bottomBevelH,shape))
    );

    hullSubtractors.push(bb);

    const _hull = difference(
        block(brickL,brickW,brickH+studH,shape),
        ...hullSubtractors    
    );

    const _block = difference(
        block(brickL,brickW,brickH,shape),
        translate([wallT,wallT,0],block(holeL,holeW,holeH,shape))
    );

    const _studs = (studStyle != 'none') ? translate([0,0,brickH],studs(l,w)): undefined;

    const _supports = (l > 1 || w > 1) ? supports(l-1,w-1,brickH) : undefined
    
    const brick = intersection(
        union([_block,_studs,_supports].filter(p=>p)),
        _hull
    );

    return brick;
}

function block(l,w,h,shape) {
    const largestD = (l>w) ? l : w;
    const baseBlock = cube({size:[l,w,h]});
    
    if(shape=='round') {
        return intersection(
            translate([l/2,w/2,0],cylinder({r:largestD/2, h})),
            baseBlock
        )
    }

    if(shape=='quarter') {
        return intersection(
            cylinder({r:largestD, h}),
            baseBlock
        )
    }
    return baseBlock;
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

function studs(l,w,r = studR, h = studH) {
    const stud = cylinder({r,h});
    return translate([unitW/2,unitW/2,0],gridOf(stud,l,w));
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}