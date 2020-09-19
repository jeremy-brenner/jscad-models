include('plug.jscad');
include('rotator_outside.jscad');

function main() {
    const t = 2;

    const _plug = plug();
    const plugs = union(
        _plug,
        translate([0,50,0],_plug)
    );

    const holderBase = union(
        translate([0,0,t],rotatorOutside()),
        rotate([0,180,0],center([true,true,false],plugs)),
        difference(
            cylinder({r:34,h:t,fn:64}),
            cylinder({r:16,h:t,fn:64})
        )
    );

    return holderBase;
}