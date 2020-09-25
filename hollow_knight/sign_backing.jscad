


function getParameterDefinitions() {
    return [
        { name: 'keyTest', type: 'checkbox', checked: false, caption: 'Key test:' },
    ];
  }
  

function main({keyTest}) {
    const backing = signBacking();
    if(!keyTest) {
        return backing;
    }

    return intersection(
        backing,
        translate([0,10,0],cube({size:[100,100,100],center:[true,false,false]}))
    );
    
}

signBacking = function(buffer=0) { 
    return difference(
        scale([1,1.3,1],cylinder({r:20,h:2+buffer,fn:64})),
        translate([0,18+buffer,0],cube({size:[2-buffer,8-buffer,2+buffer], center:[true,false,false]}))
    );
}