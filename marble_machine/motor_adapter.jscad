function main() {
    const hexR = 5;
    const hex = cylinder({r:hexR,h:19,fn:6})
    const round = cylinder({r:5.25,h:6.5,fn:64})

    const postHole = intersection(
        cylinder({r:2.85,h:8}),
        cube({size:[4,6,8], center:[true,true,false]})
    );


    return difference(
        union(
            translate([0,0,6.5],hex),
            round 
        ),
        postHole
    );
}