include('grub.jscad');

function main() {
    const grubScale = 1/3;

    const _grub = scale([grubScale,grubScale,grubScale], grub());
    return difference(
        _grub,
        translate([0,0,-31.144],cube({size:[70,70,5],center:[true,true,false]}))
    )
}