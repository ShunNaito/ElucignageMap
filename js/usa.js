var zoom2 = new Datamap({
  element: document.getElementById("usa"),
  scope: 'world',
  // Zoom in on USA
  setProjection: function(element) {
    var projection = d3.geo.equirectangular()
      .center([-115, 35])
      .rotate([4.4, 0])
      .scale(230)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path()
      .projection(projection);

    return {path: path, projection: projection};
  }
});