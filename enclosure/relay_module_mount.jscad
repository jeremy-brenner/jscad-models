function main() {
    return union(
        center([true,true,false],relayModuleMount()),
        center([true,true,false],cube({size:[76,56,1]}))
    );
}
relayModuleMount = function() {
    xDistance = 68;
    yDistance = 48;

    const post = difference(
        cylinder({r:3.1,h:5}),
        cylinder({r:1.375,h:5})
    )

    const posts = union(
        post,
        translate([xDistance,0,0],post),
        translate([0,yDistance,0],post),
        translate([xDistance,yDistance,0],post)
    )

    return posts
}