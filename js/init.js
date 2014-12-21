loadArticles("data/article.csv", function(data) {
    articles.create(data);
});

loadStats("data/Total.csv", function(data) {
    map.create(data);
    var statistics = changeDataFormat(data);
    // 合計感染者数をデフォルトで表示する
    graph.create(statistics.close);
});

var parseDate = d3.time.format("%Y/%m/%d").parse;

//　新聞記事データの日付の形式を変換
function loadArticles(filename, callback) {
    d3.csv(filename, function(error, data) {
	data.forEach(function(d) {
	    d.date = parseDate(d.date);
	});

	callback(data);
    });
}

// 統計データのヘッダーの名前を変換
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
		var countryNameArray = Object.keys(data[0]);
	    // データをフォーマット
	    data.forEach(function(d) {
	      d.date = parseDate(d.date);
	      for(var i=1; i<=countryNameArray.length-1; i++){
	        d[countryNameArray[i]] =+ d[countryNameArray[i]];
	      }
		});
	    callback(data);
	});
}

// データを連想配列にする
function changeDataFormat(data){
	var totalData;

	// csvデータのヘッダーを取得
    var keys = Object.keys(data[0]);
    // ヘッダーから日付の名前を取得
    var date = keys[0];
    // ヘッダーからそれぞれの国の名前を取得
    var countries = keys.slice(1);

    // データ文の連想配列を作成
    var dict = {};
    for (var i = 0; i < countries.length; i++) {
		dict[countries[i]] = [];
    }

    // 国をキーとして、それぞれの配列に格納
    for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < countries.length; j++) {
		    var c = countries[j];
		    var d = data[i][date];
		    var v = parseInt(data[i][c]);
		    if (isNaN(v)) { continue; }
		    dict[c].push({date: d, "value": v});
		}
    }
	totalData = dict;
	return totalData;
}