
function main() {
    return signBacking();
}

signBacking = function() { 
    return difference(
        scale([1,1.3,1],cylinder({r:20,h:2,fn:64})),
        translate([0,20,0],cube({size:[2,8,2], center:[true,false,false]}))
    );
}