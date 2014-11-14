// タイムスライダー
d3.csv("./EbolaArticle.csv", function(error, data) {
    // 時系列情報をパース
    data.forEach(function(d) {
        d.date = parseDate(d.date);
    });
    //　目盛りを年月日表示したい
    //　目盛りの最小値
    var min = d3.min(data, function(d) { return d.date; }).getDate();
    //　目盛りの最大値
    var max = d3.max(data, function(d) { return d.date; }).getDate();
    //　タイムスライダーのインタラクション
	d3.select('#slider').call(d3.slider().axis(true).min(min).max(max).step(1).on("slide", function(evt, value) {
		d3.select('#test').text(value);
		//　値（時系列）に応じて記事をハイライト
		for(var i=0; i<=data.length-1; i++){
			if(value == data[i].date.getDate()){
				document.getElementById(data[i].date).style.color = "red";
				$('#zoom_map').empty();
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
					},
					fills: {
						defaultFill: "#ABDDA4",
						gt50: colors(Math.random() * 20),
						eq50: colors(Math.random() * 20),
						lt25: colors(Math.random() * 10),
						gt75: colors(Math.random() * 200),
						lt50: colors(Math.random() * 20),
						eq0: colors(Math.random() * 1),
						pink: '#0fa0fa',
						gt500: colors(Math.random() * 1)
					},
					data: {
						'ZAF': { fillKey: 'gt50' },
						'ZWE': { fillKey: 'lt25' },
						'NGA': { fillKey: 'lt50' },
						'MOZ': { fillKey: 'eq50' },
						'MDG': { fillKey: 'eq50' },
						'EGY': { fillKey: 'gt75' },
						'TZA': { fillKey: 'gt75' },
						'LBY': { fillKey: 'eq0' },
						'DZA': { fillKey: 'gt500' },
						'SSD': { fillKey: 'pink' },
						'SOM': { fillKey: 'gt50' },
						'GIB': { fillKey: 'eq50' },
						'AGO': { fillKey: 'lt50' }
					}
				});
			}else{
				document.getElementById(data[i].date).style.color = "black";
			}
		}
	}));
});