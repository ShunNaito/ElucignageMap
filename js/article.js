var parseDate = d3.time.format("%Y-%m-%d").parse;

function displayText(){
	// データを読み込む
    d3.csv("./EbolaArticle.csv", function(error, data) {
        // データをフォーマット
        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

	//　新聞記事の本文を表示する
	d3.select("#articlePane").selectAll("li")
	    .data(data)
	    .enter()
	    .append("li")
	    .attr("id",function(d) {
		return d.date;
	    })
	    .text(function(d) { return d.text});
    });
}