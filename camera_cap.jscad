
function main() {
    const h = 45;
    const w = 37.5;
    return union([
        cube({size:[w,w,2], center:[true,true,false]}),
        difference([
            cube({size:[w,w,h], center:[true,true,false]}),
            cylinder({d:35.5,h})
        ])
    ]);
}