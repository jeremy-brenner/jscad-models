function main() {
    return difference(
        union(
            cylinder({r:3.5,h:18, fn:6}),
            cylinder({r:2.8,h:27.5, fn:32})
        ),
        cylinder({r:1,h:27.5})
    );
}