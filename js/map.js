var colors = d3.scale.category10();
var zoom = new Datamap({
	element: document.getElementById("zoom_map"),
	scope: 'world',
	// Zoom in on Africa
	setProjection: function(element) {
		var projection = d3.geo.equirectangular()
			.center([23, -3])
			.rotate([4.4, 0])
			.scale(400)
			.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
		var path = d3.geo.path()
			.projection(projection);

		return {path: path, projection: projection};
	}
});

$(function(){
     $(".datamaps-subunit.GIN").click(function(){
     	drawGraph("Guinea");
    });
});