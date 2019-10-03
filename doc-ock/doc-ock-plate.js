const base_r = 35;
const base_d = 10;
const base_t = 5;
const base_p = base_r+base_d;

const bump_r = 39;
const bump_h_r = bump_r * 0.7;
const bump_z = bump_r * 0.45;

const quality = 1;

const fn = 16 * quality;

const scaleBumpHRTo = 43;

const scaleFactor = scaleBumpHRTo/bump_h_r;


function main() {
    const start = Date.now();
    const model = scale(scaleFactor,render());
    const bounds = model.getBounds();
    console.log(bounds[1].y - bounds[0].y);
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    
    const renderables = [];
    renderables.push(base());
    renderables.push(centerBumps());
    renderables.push(connectorBumps());     
    return union(renderables);
    
    //for printing
//    renderables.push(base());
  //  renderables.push(connectorBumps());
  //  return intersection(union(renderables), cube(200,200,200));
  //  return intersection(union(renderables), translate([-200,0,0],cube(200,200,200)));
  
 //return bump1();
 // return bump2();
   //  return bump3();

}

function base() {
    return difference(
        union(
            pads(),
            top(),
            translate([19,70,0],wing()),
            translate([19,-70,0],mirror([0,1,0],wing())),
            translate([-32,-50,0],cube([110,100,base_t]))
        ),
        translate([-base_p,-base_p,2],cylinder({r:bump_h_r, h:28, fn})),
        translate([-base_p,base_p,2],cylinder({r:bump_h_r, h:28, fn})),
        translate([base_p,-base_p,2],cylinder({r:bump_h_r, h:28, fn})),
        translate([base_p,base_p,2],cylinder({r:bump_h_r, h:28, fn})),
        translate([-75,-58,0],cube([150,116,base_t-2]))
    );
}

function connectorBumps() {
    return union(
        translate([-base_p,-base_p,base_t],bump()),
        translate([-base_p,base_p,base_t],bump()),
        translate([base_p,-base_p,base_t],bump()),
        translate([base_p,base_p,base_t],bump())
    );
}



function bump1() {
    return difference(
        translate([-50,0,-3],rotate([0,0,180],tBump({b_height:10,s_length:22,s_width:5,angle:30}))),
        translate([-150,-150,-3],cube([300,300,8])),
        bump2()
    );
}

function bump2() {
    return difference( 
        translate([-43,0,-3],tBump({b_height:10,s_length:58,s_width:5,angle:35})),
        translate([-150,-150,-3],cube([300,300,8]))
    );

}
function bump3() {
    return difference( 
        translate([19.5,0,-3],tBump({b_height:10,s_length:53,s_width:1,angle:15})),
        translate([-150,-150,-3],cube([300,300,8])),
        bump2()
    );
}

function centerBumps() {
    return union( bump1(), bump2(), bump3() );
}

function wing() {
    return union( 
        translate([2.8,2.8,0],cylinder({r:base_r/2.5,h:base_t, fn})),
        rotate([0,0,-16],translate([0,-27.7,0],cube([37,45,base_t]))),
      
        difference(
            rotate([0,0,30],translate([-50,-45,0],cube([50,50,base_t]))),
              translate([-21.7,-5,0],cylinder({r:base_r/2.9,h:base_t*4, fn}))
            )
    );
}

function tBump({b_height,s_length,s_width,angle}) {
   const rad = angle/2 * Math.PI/180;
   const x = s_length*Math.cos(rad);
   const y = s_length*Math.sin(rad);
   
    return intersection(
        union(
        linear_extrude({ height: b_height }, polygon([ [0,-s_width/2],[x,-y-s_width/2],[x,y+s_width/2],[0,s_width/2] ])),
        translate([0,-s_width/2,0],rotate([0,0,-angle/2],lBevel(b_height,s_length))),
        translate([0,s_width/2,0],rotate([0,0,-90],lBevel(b_height,s_width))),
        translate([x,-y-s_width/2,0],rotate([0,0,90],lBevel(b_height,s_width+y*2))),
        translate([0,s_width/2,0],rotate([0,0,angle/2],rBevel(b_height,s_length))),
        translate([0,-s_width/2,0],sphere({r:b_height, fn})),
        translate([0,s_width/2,0],sphere({r:b_height, fn})),
        translate([x,-y-s_width/2,0],sphere({r:b_height, fn})),
        translate([x,y+s_width/2,0],sphere({r:b_height, fn}))
        ),
        translate([-b_height,-y-b_height*2,0],cube([x+b_height*2,y*2+b_height*4,b_height]))
    );
}

function top() {
    return difference(
        union(
            translate([-base_p,-base_p,0],cylinder({r:base_r,h:base_t, fn})),
            translate([-base_p,base_p,0],cylinder({r:base_r,h:base_t, fn})),
            translate([-base_p-base_r+2,-base_p,0],cube([base_r*2,base_p*2,base_t]))
        ),
        scale([1,1.52,1],translate([-121.2,0,0],cylinder({r:base_r,h:30, fn})))
);

}

function pads() {
    return union(
        translate([base_p,-base_p,0],cylinder({r:base_r,h:base_t, fn})),
        translate([base_p,base_p,0],cylinder({r:base_r,h:base_t, fn}))
    );
}



function rBevel(r,l) {
    return bevel(r,l,0);
}

function lBevel(r,l) {
    return bevel(r,l,1);
}

function bevel(r,l,s) {
    return intersection(
        translate([0,-r*s,0],cube([l,r,r])),
        rotate([0,90,0],cylinder({r,h:l,fn}))
        )
}


function bump() {
    return difference(
        intersection(
            translate([0,0,-bump_z],sphere({r:bump_r,fn})),
            translate([-bump_r,-bump_r,0],cube([bump_r*2,bump_r*2,28]))
        ),
        cylinder({r:bump_h_r, h:28, fn})
    );
}