


function getParameterDefinitions() {
  return [
    { name: 'pw', caption: 'pw:', type: 'float', default: 6.8 },
    { name: 'ph', caption: 'ph:', type: 'float', default: 20 },
    { name: 'ww', caption: 'ww:', type: 'float', default: 0.8 },
    { name: 'cx', caption: 'x:', type: 'int', default: 5 },
    { name: 'cy', caption: 'y:', type: 'int', default: 2 },

  ];
}


function seq(num) {
  return [...Array(num).keys()];
}

function cavities({pw,ph,ww,cx,cy}) {
  return seq(cy).map( (y) => {
    return seq(cx).map( (x) => {
      return translate([x*(pw + ww)+ww,y*(pw+ww)+ww,ww],cube({size: [pw, pw, ph], center: false}))
    });
  }).flat();
}
      
function holes({pw,ph,ww,cx,cy}) {
  return seq(cy).map( (y) => {
    return seq(cx).map( (x) => {
      return translate([x*(pw+ww)+pw/2+ww,y*(pw+ww)+pw/2+ww,0],cylinder({r: pw*0.25, h: 10}))
    });
  }).flat();
}

function windows({pw,ph,ww,cx,cy}) {
  const window = cube({size: [pw-ww*2,((pw+ww)*cy+ww*8),ph/2-ww*2], fn: 20, radius: (pw-ww*2)/2, round: true, center: false});
    return seq(cx).map( (x) => {
      return translate([x*(pw + ww)+ww*2,-ww*4,ww*2],
        union(
          window,
          translate([0,0,ph/2],window)
        )
      );
    });
}

function box({pw,ph,ww,cx,cy}) {
  return difference( 
    cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false}),
    ...cavities({pw,ph,ww,cx,cy}),
    ...windows({pw,ph,ww,cx,cy}),
    ...holes({pw,ph,ww,cx,cy})
  ); 
 }
 
 function lid({pw,ph,ww,cx,cy}) {
  return difference(
      cube({size: [(pw+ww)*cx+ww*3,(pw+ww)*cy+ww*3,ph/4], center: false}),
      translate([ww,ww,ww*3],cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false})),
    translate([ww,ww,-ph+0.8],cube({size: [(pw+ww)*cx+ww,(pw+ww)*cy+ww,ph+ww], center: false})),
  ...holes({pw,ph,ww,cx,cy})
  );
 }

function main ({pw,ph,ww,cx,cy}) {
  return box({pw,ph,ww,cx,cy});
  return union(
    translate([0,(pw+ww)*cy+ww*5,0],box({pw,ph,ww,cx,cy})),
    lid({pw,ph,ww,cx,cy})
  );
}