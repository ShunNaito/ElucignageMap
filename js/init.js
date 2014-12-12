loadArticles("data/article.csv", function(data) {
    console.log(data);
    // add articles in dom
});

loadStats("data/Total.csv", function(data) {
    console.log(data);
    // 
});

function loadArticles(filename, callback) {
    var parseDate = d3.time.format("%Y/%m/%d").parse;
    d3.csv(filename, function(error, data) {
	data.forEach(function(d) {
	    d.date = parseDate(d.date);
	});

	callback(data);
    });
}

function loadStats(filename, callback) {
    d3.csv("data/Total.csv")
	.row(function(d) {
	    return {date : d.date,
		    close : d["close"],
		    GIN : d["ギニア"],
		    LBR : d["リベリア"],
		    SLE : d["シエラレオネ"],
		    NGA : d["ナイジェリア"],
		    SEN : d["セネガル"],
		    USA : d["アメリカ"],
		    MLI : d["マリ"],
		    ESP : d["スペイン"]};
	}).get(function(error, data) {
	    callback(data);
	});
}