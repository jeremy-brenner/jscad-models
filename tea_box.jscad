function main() {
    const l = 170
    const w = 69
    const h = 64
    const t = 1.5

    const hw = 15;
    const hd = 10;

    const holeCube = cube({size:[hw,hw,t], center:[true,true,false]});
    const holeCubeRow = iterate(9).map(i => translate([i*(hw+hd),0,0],holeCube))
    const holeCubeGrid = iterate(9).map(i => translate([0,i*(hw+hd),0],holeCubeRow))

    const holes = rotate([0,0,45],center([true,true,false],union(holeCubeGrid)))
  
    //return ;
    const box = difference(
        cube({size:[l+t*2,w+t*2,h+t], center:[true,true,false]}),
        translate([0,0,t],cube({size:[l,w,h], center:[true,true,false]}))
    )

    const mesh = difference(
        box,
        holes,
        translate([0,w/2+t,0],rotate([90,0,0],holes)),
        translate([0,-w/2,0],rotate([90,0,0],holes)),
        translate([l/2,0,18],rotate([0,90,0],holes)),
        translate([-l/2-t,0,18],rotate([0,90,0],holes)),
        translate([-l/2-t,0,h-15],rotate([0,90,0],union(cylinder({r:20,h:l+t*2}),translate([-40,-20,0],cube({size:[40,40,l+t*2]}))  )))
    )
    
    const dip = intersection(
        box,
        translate([-l/2-t,0,h-15],
            rotate([0,90,0],
                difference(
                    union(cylinder({r:20,h:l+t*2}),translate([-16.5,-20,0],cube({size:[16.5,40,l+t*2]}))),
                    union(cylinder({r:20-t,h:l+t*2}),translate([-18.5,-20,0],translate([0,t,0],cube({size:[18.5,40-t*2,l+t*2]}))))
                )
            )
        )
    )

    
    const brim = union(
        translate([l/2,25,h],cube({size:[t,10,t], center: [false,true,false]})),
        translate([l/2,-25,h],cube({size:[t,10,t], center: [false,true,false]})),
        translate([-l/2-t,25,h],cube({size:[t,10,t], center: [false,true,false]})),
        translate([-l/2-t,-25,h],cube({size:[t,10,t], center: [false,true,false]})),
        translate([l/2,0,0],cube({size:[t,w,t], center: [false,true,false]})),
        translate([-l/2-t,0,0],cube({size:[t,w,t], center: [false,true,false]})),
        translate([0,w/2,h],cube({size:[l+t*2,t,t], center: [true,false,false]})),
        translate([0,-w/2-t,h],cube({size:[l+t*2,t,t], center: [true,false,false]})),
        translate([0,w/2,0],cube({size:[l+t*2,t,t], center: [true,false,false]})),
        translate([0,-w/2-t,0],cube({size:[l+t*2,t,t], center: [true,false,false]})),
        translate([l/2,w/2,0],cube({size:[t,t,h]})),
        translate([-l/2-t,w/2,0],cube({size:[t,t,h]})),
        translate([-l/2-t,-w/2-t,0],cube({size:[t,t,h]})),
        translate([l/2,-w/2-t,0],cube({size:[t,t,h]})),
        dip
    );
    return union(mesh,brim);
}

function iterate(num) {
    return [...Array(num).keys()];
}