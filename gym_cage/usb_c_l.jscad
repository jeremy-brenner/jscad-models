function main() {
    return usbCL();
}

usbCL = function() {
   const cr=1.5;
  const cutout = 
    difference(
        union(
            cube({size:[12.75,21,7]}),
            cube({size:[18,11.25,7]}),
            translate([12.75,11.25,0],difference(cube({size:[cr,cr,7]}),translate([cr,cr,0],cylinder({r:cr,h:7}))))
        ),
        difference(
            cube({size:[3,3,7]}),
            translate([3,3,0],cylinder({r:3,h:7}))
        )
    );

  return difference(
     translate([-1.5,-9.25,-2],cube({size:[16.5,30.25,9]})),
     cutout
  )
}