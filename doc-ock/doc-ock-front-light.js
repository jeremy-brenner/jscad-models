
const quality = 4;
const scaleFactor = 1;
const fn = 16 * quality;


function main() {
    const start = Date.now();
    const model = scale(scaleFactor,render());
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    return union(
        cylinder({r:20,h:1,fn}),
        difference(
            cylinder({r:16,h:4,fn}),
            cylinder({r:10,h:4,fn}),
            translate([16,0,0],cylinder({r:4,h:4,fn})),
            translate([-16,0,0],cylinder({r:4,h:4,fn})),
            translate([0,16,0],cylinder({r:4,h:4,fn})),
            translate([0,-16,0],cylinder({r:4,h:4,fn}))
        )
    );

}


