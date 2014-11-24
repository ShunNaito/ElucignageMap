var zoom = new Datamap({
	element: document.getElementById("africa"),
	scope: 'world',
	// Zoom in on Africa
	setProjection: function(element) {
		var projection = d3.geo.equirectangular()
			.center([30, 3])
			.rotate([4.4, 0])
			.scale(240)
			.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
		var path = d3.geo.path()
			.projection(projection);

		return {path: path, projection: projection};
	}
});

$(function(){
	// データを読み込む
  	d3.csv("data/Total.csv", function(error, data) {
  		var countryNameArray = Object.keys(data[0]);
    	for(var j=2; j<=countryNameArray.length-1; j++){
    		$('.datamaps-subunit'+'.'+countryNameArray[j]).click(function(){
		     	var eventClass = event.target.className;
		     	drawGraph(eventClass.animVal.replace( /datamaps-subunit /, '' ));
		     });
          }
  	});
});