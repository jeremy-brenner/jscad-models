function main() {
    return union(
        center([true,true,false],lm2596Mount()),
        center([true,true,false],cube({size:[40,21,1]}))
    );
}
lm2596Mount = function() {
    xDistance = 30;
    yDistance = 16;

    const post = difference(
        cylinder({r:2.5,h:5}),
        cylinder({r:1.375,h:5})
    )

    const posts = union(
        translate([0,yDistance,0],post),
        translate([xDistance,0,0],post)
    )

    return posts
}