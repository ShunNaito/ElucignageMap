// タイムスライダー
d3.csv("data/EbolaCaces.csv", function(error, data) {
    var countryNameArray = Object.keys(data[0]);
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
        var countryName = countryNameArray[1];

        $('.datamaps-subunit'+"."+countryName).css('fill','#C99');
        // テスト（スライダーの値をコンソールに表示）
        console.log(value);
        d3.csv("data/EbolaArticle.csv", function(error, data) {
            // 時系列情報をパース
            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });
            //　値（時系列）に応じて記事をハイライト
            for(var i=0; i<=data.length-1; i++){
                if(value == data[i].date.getDate()){
                    document.getElementById(data[i].date).style.color = "red";
                }else{
                    document.getElementById(data[i].date).style.color = "black";
                }
            }
        });
    }));
});