const d = 17;
const h = 95;

function main() {
    return cigar();
}

function cigar() {
    return difference(
        union(
            sphere({r:d/2}),
            cylinder({d,h})
        ),
        sphere({r:d/2-1}),
        cylinder({d:d-2,h})
    );
}
