// グラフの表示領域を設定
var margin = {top: 50, right: 20, bottom: 30, left: 50};
var width = window.innerWidth/10*6.8 - margin.left - margin.right;
var height = window.innerHeight/10*3 - margin.top - margin.bottom;

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

// svgの定義
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 線の定義
    var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

var graph = {};

graph.create = function(data) {
  //　時系列順にソート
    data.sort(function(a, b) {
      return a.date - b.date;
    });

    // データを入力ドメインとして設定
    // 同時にextentで目盛りの単位が適切になるようにする
    x.domain(d3.extent(data, function(d) { return d.date; })).clamp(true);
    y.domain(d3.extent(data, function(d) { return d.value; }));
    // x軸をsvgに表示
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // y軸をsvgに表示
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Casualties (人)");

    // path要素をsvgに表示し、折れ線グラフを設定
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
}