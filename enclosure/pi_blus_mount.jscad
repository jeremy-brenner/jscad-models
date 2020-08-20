function main() {
    return bPlusMount();
}
bPlusMount = function() {
    xDistance = 58;
    yDistance = 49;

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