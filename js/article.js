// 日付データのパースを設定
var parseDate = d3.time.format("%Y/%m/%d").parse;

var articleDate = new Array();

function displayText(){
	// データを読み込む
	d3.csv("data/article.csv", function(error, data) {
		var i=0;
		// データをフォーマット
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			articleDate[i] = d.date;
			i++;
		});
		//　新聞記事の本文を表示する
		d3.select("#articlePane").selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.append("p")
			.attr("class",function(d) {
				return Date.parse(d.date);
			})
			.on("click",function(d){
				$('.focus').attr("transform", "translate("+x(d.date)+",0)");
				if($('.'+Date.parse(d.date)) != null){
					d3.selectAll("li").selectAll("p").style("color", "black");
				$('.'+Date.parse(d.date)).css('color','red');
				}else{
					d3.selectAll("li").selectAll("p").style("color", "black");
				}
			})
			.text(function(d) { return d.text; });

			//　デフォルトで累計患者数を表示
			drawGraph("close", articleDate);
	});
}