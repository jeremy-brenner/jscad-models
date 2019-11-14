
batteries = {
    aaa: {
        d: 10,
        h: 44
    }
}

batteryType = 'aaa';
batteryCount = 2;

buffer=1;
wallThickness = 1;

battery = batteries[batteryType];

function main() {
    return difference(
        tube(),
        hollow()
    );
}

function tube() {
    const d = battery.d+buffer+wallThickness*2;
    const h = battery.h*batteryCount+buffer+wallThickness*2;
    return cylinder({d,h});
}

function hollow() {
    const d = battery.d+buffer;
    const h = battery.h*batteryCount+buffer;
    const slitWidth = 0.5;
    return translate([0,0,wallThickness],
        union(
        cylinder({d,h}),
        translate([-d/4,-d-wallThickness,0],cube([d/2,d+buffer+wallThickness,slitWidth])),
        translate([-d/4,-d-wallThickness,h-wallThickness+slitWidth],cube([d/2,d+buffer+wallThickness,slitWidth])),
        translate([-d/2+buffer/2,0,0],cube([battery.d,d+buffer+wallThickness,h]))
    ));
}