include('./thread.jscad');

function getParameterDefinitions() {
  return [
      { name: 'p', type: 'number', initial: 1.3, caption: "Thread Pitch:", step: 0.1 },
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

function main({p,r,showBolt,h,hh,hr,showNut,nh,nr,rDiff}) {
    const fn = 32;
    const models = [];
    if(showNut) {
      models.push(
        translate([nr+1,0,0],
          nut({tr:r+rDiff,nr,h:nh,fn,p})
        )
      );
    }
    if(showBolt) {
      models.push(
        translate([-hr-1,0,0],
          bolt({tr:r,hr,hh,th:h,fn,p})
        )
      );
    }

    return union(models);
}
  
function nut({tr,nr,h,p=1,fn=32}) {
  return union(
    difference(
      cylinder({r:nr,h,fn:6}),
      cylinder({r:tr+0.5*p,h,fn})
    ),
    thread({r:tr,h,fn,p,external:false})
  );
}

function bolt({tr,hr,hh,th,p=1,fn=32}) {
  return union(
    thread({r:tr,h:th,fn,p}),
    cylinder({r:tr,h:th,fn}),
    cylinder({r:hr,h:hh,fn:6})
  );
}