seq = function(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}
  
function getParameterDefinitions() {
    return [
        { name: 'lineW', type: 'float', initial: 1, caption: "Line width:" },
        { name: 'lineH', type: 'float', initial: 1, caption: "Line height:" },
        { name: 'circleR', type:'int', initial: 15, caption: "Circle radius:" },
        { name: 'sideLen', type:'int', initial: 3, caption: "Side Length:" },
    ];
}


function main({lineW,lineH,circleR,sideLen}) {
    const fn = 32;
       
    const xShift = circleR*Math.sqrt(3)/2;
    const yShift = circleR*1/2;

    const circleBoundary = cylinder({r:circleR+lineW/2, h:lineH, fn});
    const circle = difference(
        circleBoundary,
      cylinder({r:circleR-lineW/2, h:lineH, fn})
    );
   
    const shiftedCircle = translate([circleR,0,0],circle)

    const flower = intersection( 
      circleBoundary,
      union( 
        circle,
        ...seq(6).map( i => rotate([0,0,i*60],shiftedCircle) )
      ) 
    );
  
    const sides = seq(sideLen).map( i => translate([-yShift*i,0,0],circleLine(sideLen+i,flower,circleR)));
    seq(sideLen-1).forEach(i => sides[sideLen+i] = sides[sideLen-2-i] )
    
    return union(
        sides.map( (side,i) => translate([0,xShift*i,0],side ) )  
    )
}

function circleLine(length,circle,circleR) {
   return union( seq(length).map( i => translate([circleR*i,0,0],circle) ) );
}