function getParameterDefinitions() {
    return [
        { name: 'render', type: 'choice', values: ['all', 'top','middle','bottom'], captions: ['All', 'Top', 'Middle', 'Bottom'], initial: 'all', caption: 'Render:'}
    ];
}


function main({render}) {
    const threadRI = 1.4;
    const threadRO = 11;
    const threadRings = 11;
    const pegH = 5;

    const peg = cylinder({r:2.5,h:pegH});

    const endCap = union(
        cylinder({r1: 15, r2: 13, h: 5 }),
        translate([0,0,4.5],peg)
    );
 
    const bottomEndCap = difference(
        endCap,
        translate([0,12.5,-5],rotate([20,0,0],cylinder({h:9, d:6})))
    );
    
    const _thread = difference(
        thread({ri:threadRI, ro:threadRO, rings: threadRings}),
        peg,
        translate([0,0,threadRings*threadRI*2-pegH],peg)
    );
   
    const renderables = [];
    if(render=='top'||render=='all') {
        renderables.push(translate([0,0,threadRings*threadRI*2+5],rotate([180,0,0],endCap)));
    }
    if(render=='middle'||render=='all') {
        renderables.push(_thread);
    }
    if(render=='bottom'||render=='all'){
        renderables.push(translate([0,0,-5],bottomEndCap));
    }
    return union(renderables);
}

function thread({ri,ro,rings}) {
    const ring = torus({ri, ro});
    const core = cylinder({r:ro, h:ri*2*rings});
    return union(
        core,
        ...seq(rings).map(i => translate([0,0,ri*2*i+ri],ring))
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}