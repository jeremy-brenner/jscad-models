
let w = 126;
let l = 218;
let h = 45;
let t = 3;
let r = 13;
    
function shell() {
  return difference(
    CSG.roundedCube({center: [0, 0, (h+r)/2], radius: [w/2,l/2,(h+r)/2], roundradius: r, resolution: 25 }),
   CSG.roundedCube({center: [0, 0, (h+r)/2], radius: [w/2-t,l/2-t,(h+r)/2-t], roundradius: r-t, resolution: 25 }),
   translate([0,0,h],cube({size: [w,l,r], center:[true,true,false]})),
   port(),
   translate( [10,65,0], fanGrate() ),
   translate( [w/2,-50,0], sideGrate()),
   translate( [-w/2,-50,0], sideGrate())
   );
}

function port() {
 return translate([0,0,h-10],cube({size:[20,l,10], center:[true,true,false]}));
}

function post() {
  return difference(
    translate([0,0,t],
      union(
          cylinder({r: 4, h: h-t}),
          translate([0,0,t],cube({size:[r-t,1,h-t*4]}))
      )
    ),
    translate([0,0,t],cylinder({r: 1, h: h-t}))
  );
}

function postRow() {
    return union(
      translate([0,95,0],post()),
      translate([0,0,0],post()),
      translate([0,-95,0],post())
    );
}

function allPosts() {
  return union(
      translate([50.5,0,0],postRow()),
      translate([-50.5,0,0],rotate([0,0,180],postRow()))
  );   
}

function fanPost() {
    return translate(
      [0,0,t],
      difference(
        cylinder({r: 2, h: 25-t}),
        cylinder({r: 0.5, h: 25-t})
      ) 
    );
}

function allFanPosts() {
    return union(
        translate([25,25],fanPost()),
        translate([25,-25],fanPost()),
        translate([-25,-25],fanPost()),
        translate([-25,25],fanPost())
    );
}

function fanRing(radius) {
    return difference( 
        cylinder({r: radius, h: h-t}),
        cylinder({r: radius-3, h: h-t})
    );
}

function fanGrate() {
    let rw = 58;
    let bar = cube({size:[rw,3,h],center:[true,true,false]});
    return difference( 
        union(
            fanRing(rw/2),
            fanRing(rw/2-3*2),
            fanRing(rw/2-3*4)
        ),
        bar,
        rotate([0,0,45], bar),
        rotate([0,0,90], bar),
        rotate([0,0,135], bar)
    );
}

function sideGrateFin() {
  return cube({size: [15,3,15], center:[true,true,false]});
}

function sideGrate() {
    return union(
        translate([0,-9,0],sideGrateFin()),
        translate([0,-3,0],sideGrateFin()),
        translate([0,3,0],sideGrateFin()),
        translate([0,9,0],sideGrateFin())
    );
}

function main() {    
  return union( 
      shell(), 
      allPosts(), 
      translate( [10,65,0],allFanPosts())
  );
}