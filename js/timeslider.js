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
				$('.datamaps-subunit.AGO').css('fill','#C99');
			}else{
				document.getElementById(data[i].date).style.color = "black";
			}
		}
	}));
});