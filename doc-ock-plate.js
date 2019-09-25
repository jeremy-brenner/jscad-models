const base_r = 40;
const base_d = 10;
const base_t = 2;
const base_p = base_r+base_d;

const bump_r = 39;
const bump_h_r = bump_r * 0.7;
const bump_z = bump_r * 0.3;

const quality = 1;

const fn = 16 * quality;


function main() {
    const start = Date.now();
    const model = render();
    const runTime = Date.now() - start;
    console.log(runTime/1000);
    return model;
}

function render() {
    const renderables = [];
    renderables.push(pads());
    renderables.push(top());
    renderables.push(translate([-50,0,base_t],tBump({b_height:10,s_length:65,s_width:5,angle:30})));
    renderables.push(translate([-base_p,-base_p,base_t],bump()));
    renderables.push(translate([base_p,-base_p,base_t],bump()));
    renderables.push(translate([base_p,base_p,base_t],bump()));
    renderables.push(translate([-base_p,base_p,base_t],bump()));
    return union(renderables);
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
scale([1,1.5,1],translate([-119.3,0,0],cylinder({r:base_r,h:30, fn})))
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
          )
}