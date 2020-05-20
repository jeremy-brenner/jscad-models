include('threads.jscad');

function getParameterDefinitions() {
  return [
      { name: 'p', type: 'number', initial: 1, caption: "Thread Pitch:", step: 0.1 },
      { name: 'l', type: 'choice', values: [1,2,4], captions: ['1', '2', '4'], initial: 1, caption: 'Thread Lead:'},
      { name: 'a', type: 'choice', values: [90,60], captions: ['90 (printable)', '60 (metric)'], initial: 90, caption: 'Thread Angle:'},
      { name: 'r', type: 'int', initial: 3, caption: "Thread Radius:" },
      { name: 'showBolt', type: 'checkbox', checked: true, caption: 'Show Bolt:' },
      { name: 'h', type: 'int', initial: 15, caption: "Bolt Length:" },
      { name: 'hh', type: 'int', initial: 3, caption: "Bold Head Thickness:" },
      { name: 'hr', type: 'int', initial: 6, caption: "Bold Head Radius:" },
      { name: 'showNut', type: 'checkbox', checked: true, caption: 'Show Nut:' },
      { name: 'nh', type: 'int', initial: 3, caption: "Nut Thickness:" },
      { name: 'nr', type: 'int', initial: 6, caption: "Nut Radius:" },
      { name: 'rDiff', type: 'number', initial: 0.2, caption: "Looseness:", step: 0.1}    
  ];
}

function main({p,l,a,r,showBolt,h,hh,hr,showNut,nh,nr,rDiff}) {
    const fn = 32;
    const models = [];
    if(showNut) {
      models.push(
        translate([nr+1,0,0],
          nut({tr:r+rDiff,nr,h:nh,fn,p,l,a})
        )
      );
    }
    if(showBolt) {
      models.push(
        translate([-hr-1,0,0],
          bolt({tr:r,hr,hh,th:h,fn,p,l,a})
        )
      );
    }

    return union(models);
}
  
function nut({tr,nr,h,p,l,a,fn=32}) {
  const _threads = threads({r:tr,h,fn,p,l,a,external:false});
  return union(
    difference(
      cylinder({r:nr,h,fn:6}),
      cylinder({r:_threads.properties.maxR,h,fn})
    ),
    _threads
  );
}

function bolt({tr,hr,hh,th,p,l,a,fn=32}) {
  const _threads = threads({r:tr,h:th,fn,p,l,a});
  return union(
    _threads,
    cylinder({r:_threads.properties.minR,h:th,fn}),
    cylinder({r:hr,h:hh,fn:6})
  );
}