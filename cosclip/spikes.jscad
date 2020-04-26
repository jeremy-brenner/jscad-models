const spike_radius = 0.7;
const spike_height = 2.5;
const spike_distance = 3;

const spike_rows = 4;
const spike_columns = 4;


function main() {
    const spike = union(
        cylinder({r:spike_radius,h:spike_height}),
        translate([0,0,spike_height],sphere({r:spike_radius}))
    );
    
    const spike_row = union(seq(spike_rows).map( i => translate([i*spike_distance,0,0], spike)));
    const spike_grid = center([true,true,false],union(seq(spike_columns).map( i => translate([i*spike_distance%2*spike_distance/2,i*spike_distance,0], spike_row))));

    return union(
        spike_grid,
        translate([0,0,-1],cube({size:[spike_rows*spike_distance+spike_distance/2,spike_columns*spike_distance,1],center:[true,true,false]}))
    );
}

function seq(length) {
    return Array.apply(null, {length}).map(Function.call, Number);
}