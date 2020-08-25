seq = function(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}
  

function getParameterDefinitions() {
    return [
        { name: 'lineW', type: 'float', initial: 0.5, caption: "Line width:" },
        { name: 'lineH', type: 'float', initial: 0.5, caption: "Line height:" },
        { name: 'circleR', type:'int', initial: 20, caption: "Circle radius:" }
    ];
}

function main({lineW,lineH,circleR}) {
    const fn = 32;

    const _circle = difference(
      cylinder({r:circleR+lineW/2, h:lineH, fn}),
      cylinder({r:circleR-lineW/2, h:lineH, fn})
    );

    const innerCircles = seq(6).map(i => rotate([0,0,60*i],translate([circleR*2,0,0],_circle)))
    const outerCircles = seq(6).map(i => rotate([0,0,60*i],translate([circleR*4,0,0],_circle)))

    const radialLine = cube({size:[circleR*8,lineW,lineH],center:[true,true,false]})

    const radialLines = union(
        radialLine,
        rotate([0,0,60],radialLine),
        rotate([0,0,60*2],radialLine)
    )

    const _30deg = Math.sqrt(3)/2;
    const _60deg = 1/2;
    const wonkyLineLengthHack = 5.28;  // just go with it

    const innerHexLine = translate([0,circleR*2*_30deg,0],cube({size:[circleR*2,lineW,lineH],center:[true,true,false]}))
    const outerHexLine = translate([0,circleR*4*_30deg,0],cube({size:[circleR*4,lineW,lineH],center:[true,true,false]}))

    const innerHex = seq(6).map(i => rotate([0,0,i*60],innerHexLine))
    const outerHex = seq(6).map(i => rotate([0,0,i*60],outerHexLine))

    const innerStarLine = rotate([0,0,30],translate([0,circleR*2*_60deg,0],cube({size:[circleR*4*_30deg,lineW,lineH],center:[true,true,false]})))
    const outerStarLine = rotate([0,0,30],translate([0,circleR*4*_60deg,0],cube({size:[circleR*8*_30deg,lineW,lineH],center:[true,true,false]})))

    const innerStar = seq(6).map(i => rotate([0,0,i*60],innerStarLine))
    const outerStar = seq(6).map(i => rotate([0,0,i*60],outerStarLine))

    const wonkyLine = translate([-circleR*4,-lineW/2,0],rotate([0,0,19],cube({size:[circleR*wonkyLineLengthHack,lineW,lineH]})));
    const wonkyLines = seq(6).map(i => rotate([0,0,i*60],union( wonkyLine, mirror([1,0,0],wonkyLine))))

    return union(
        _circle,
        ...innerCircles,
        ...outerCircles,
        ...innerStar,
        ...outerStar,
        ...innerHex,
        ...outerHex,
        ...wonkyLines,
        radialLines
    );
}