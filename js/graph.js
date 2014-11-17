// グラフの表示領域
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = window.innerWidth/10*7 - margin.left - margin.right,
    height = window.innerHeight/10*2.5 - margin.top - margin.bottom;

// スケールと出力レンジの定義
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

// 軸の定義
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// 線の定義
var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// svgの定義
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

drawGraph("Total");

function drawGraph(statisticsName){
  $('.focus').empty();

  // データを読み込む
  d3.csv("data/Ebola"+statisticsName+".csv", function(error, data) {
    // データをフォーマット
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close =+ d.close;
    });

    // データを入力ドメインとして設定
    // 同時にextentで目盛りの単位が適切になるようにする
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    // x軸をsvgに表示
    focus.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // y軸をsvgに表示
    focus.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Casualties (人)");

    // path要素をsvgに表示し、折れ線グラフを設定
    focus.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
  });
}