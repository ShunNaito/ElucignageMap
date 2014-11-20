var parseDate = d3.time.format("%Y-%m-%d").parse;

function displayText(){
	// データを読み込む
    d3.csv("data/EbolaArticle.csv", function(error, data) {
        // データをフォーマット
        data.forEach(function(d) {
            d.date = parseDate(d.date);
        });

	//　新聞記事の本文を表示する
	d3.select("#articlePane").selectAll("li")
	    .data(data)
	    .enter()
	    .append("li")
	    .append("p")
	    .attr("id",function(d) {
			return d.date;
	    })
	    .on("click",function(d){
	    	$('.focus').attr("transform", "translate("+x(d.date)+",0)");
	    	if(document.getElementById(d.date) != null){
          d3.selectAll("li").selectAll("p").style("color", "black");
          document.getElementById(d.date).style.color = "red";
            // console.log("OK");
        }else{
            d3.selectAll("li").selectAll("p").style("color", "black");
            // console.log("NG");
        }
	    })
	    .text(function(d) { return d.text; });
    });
}