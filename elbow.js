    
function elbow(opts) {
  return intersection(
      cube({size: opts.r*2}),
      rotate_extrude(circle(opts))
  );
}
   
function main () {
 return elbow({r:0.5, fb: 30});
}