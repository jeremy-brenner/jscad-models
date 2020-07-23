include('marble_machine_cap.jscad');

function main() {
    const cap = translate([0,0,-148],marbleMachineCap());
    const rails = cube({size:[26,20,10],center:[true,false,false]})
    const notch = cube({size:[23,30,10],center:[true,false,false]})
    return difference(union(cap,rails),notch);
}