
function main() {
    return difference( union(
        disk(),
        union([...Array(6).keys()].map(i => radialTranslate(i*60 + 30,28.5,post()) )),
        union([...Array(6).keys()].map(i => radialTranslate(i*60,32,mount()) ))
        ),
        union([...Array(6).keys()].map(i => radialTranslate(i*60,28.5,hole()) ))
        );
}

function mount() {
    const h = 13;
    const d = 5.9;
    return union(
        cylinder({h:3, d:15}),
        translate([5.5,0,3],rotate([0,45,0],
        union(
          sphere({r:d/2}),
          cylinder({h, d}),
          translate([0,0,h],sphere({r:d/2}))
        )
    )));
}

function hole() {
  return cylinder({h:10, d:4});
}

function disk() {
return difference(
    cylinder({h:3, d:65, fn:64}),
    cylinder({h:3, d:45, fn:64})
    );
}

function post() {
    return union( 
        difference(cylinder({h:14, d:6}),cylinder({h:14, d:2})),
        translate([0,0,14],cylinder({h:2, d:3.75})),
        translate([0,0,16],sphere({r:3.75/2}))
        );
}

function radialTranslate(angle,distance,obj) {
    const rad = angle * Math.PI/180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return translate([distance*cos,distance*sin, 0], rotate([0,0,angle],obj));
}


