
wedge = function(options) {
    const size = options.size;
    return center(options.center, polyhedron({
        points: [
          [0, 0, size[2]], [0, size[1], size[2]], [0, size[1], 0],
          [size[0], 0, size[2]], [size[0], size[1], size[2]], [size[0], size[1], 0],
        ],
        triangles: [
          [2, 1, 0],[4,1,2],[2,5,4],[0,1,4],[0,4,3],
          [3, 4, 5],[0,3,5],[5,2,0]
        ]
      }));
}