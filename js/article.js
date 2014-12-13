var articles = {};

articles.create = function(articles) {
    d3.select("#articlePane").selectAll("li")
	.data(articles)
	.enter()
	.append("li")
	.append("p")
	.attr("class",function(d) {
	    return Date.parse(d.date);
	})
	// .on("click",function(d){
	//     $('.focus').attr("transform", "translate("+x(d.date)+",0)");
	//     if($('.'+Date.parse(d.date)) != null){
	// 	d3.selectAll("li").selectAll("p").style("color", "black");
	// 	$('.'+Date.parse(d.date)).css('color','red');
	//     }else{
	// 	d3.selectAll("li").selectAll("p").style("color", "black");
	//     }
	// })
	.text(function(d) { return d.text; });
};