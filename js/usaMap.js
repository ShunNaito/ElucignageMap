var zoom2 = new Datamap({
  element: document.getElementById("usa"),
  scope: 'world',
  // Zoom in on Africa
  setProjection: function(element) {
    var projection = d3.geo.equirectangular()
      .center([-110, 40])
      .rotate([4.4, 0])
      .scale(200)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path()
      .projection(projection);

    return {path: path, projection: projection};
  }
});