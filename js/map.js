function createDatamap(id, type) {
    var buildSetProjection = function(center, rotate, scale) {
	var setProjection = function(element) {
	    var projection = d3.geo.equirectangular()
		    .center(center)
		    .rotate(rotate)
		    .scale(scale)
		    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
	    var path = d3.geo.path()
		    .projection(projection);
	    return {path: path, projection: projection};
	};
	return setProjection;
    };

    var setProjection;
    if (type == "africa") {
	setProjection = buildSetProjection([30, 3], [4.4, 0], 240);
    } else if (type == "usa") {
	setProjection = buildSetProjection([-115, 35], [4.4, 0], 230);
    }

    var map = new Datamap({
	element: document.getElementById(id),
	scope: "world",
	setProjection: setProjection
    });
    return map;
}

var afcicaMap = createDatamap("africa", "africa");
var usaMap = createDatamap("usa", "usa");

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