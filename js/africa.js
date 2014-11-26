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
	d3.csv("data/Total.csv")
	.row(function(d){   // 行単位で読み込んで処理
		// 1行目が日本語なので安全のためラベル名など割り当て直す
		//GIN,LBR,SLE,NGA,SEN,USA
		// 将来的には国の省略語と名前（英語や日本語）が全て対応づくイメージ
		return {date : d.date, close : d["close"],GIN : d["ギニア"], LBR : d["リベリア"], SLE : d["シエラレオネ"], NGA : d["ナイジェリア"], SEN : d["セネガル"], USA : d["アメリカ"] }
	})
	.get(function(error, data) {
		var countryNameArray = Object.keys(data[0]);
		for(var j=2; j<=countryNameArray.length-1; j++){
			$('.datamaps-subunit'+'.'+countryNameArray[j]).click(function(){
				var eventClass = event.target.className;
				drawGraph(eventClass.animVal.replace( /datamaps-subunit /, '' ));
			});
		}
	});
});