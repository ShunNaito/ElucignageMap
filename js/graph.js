// グラフの表示領域
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = window.innerWidth/10*6.8 - margin.left - margin.right;
console.log(window.innerWidth);
var height = window.innerHeight/10*3 - margin.top - margin.bottom;
console.log(window.innerHeight);

// var parseDate = d3.time.format("%Y/%m/%d").parse,
var bisectDate = d3.bisector(function(d) { return d.date; }).left;
var formatValue = d3.format(",.2f");
var formatCurrency = function(d) { return "$" + formatValue(d); };

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
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


drawGraph("Total");

function drawGraph(statisticsName){
  $('#graph g').empty();

  // データを読み込む
  d3.csv("data/"+statisticsName+".csv", function(error, data) {
    var countryNameArray = Object.keys(data[0]);
    console.log(countryNameArray);
    var dataMin;
    var dataMax;
    for(var i=0; i<=data.length-1; i++){
        for(var j=2; j<=countryNameArray.length-1; j++){
            if(i==0 && j==2){
                dataMin = data[i][countryNameArray[j]];
                dataMax = data[i][countryNameArray[j]];
            }else if(data[i][countryNameArray[j]] < dataMin){
                dataMin = data[i][countryNameArray[j]];
            }else if(data[i][countryNameArray[j]] > dataMax){
                dataMax = data[i][countryNameArray[j]];
            }
        }
    }

    // データをフォーマット
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close =+ d.close;
    });

    var scale = d3.scale.linear().domain([dataMin, dataMax]).range([0, 255]);

    // データを入力ドメインとして設定
    // 同時にextentで目盛りの単位が適切になるようにする
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

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

    svg.append("g")
       .attr("class", "icon")
       .attr("clip-path", "url(#clip)")
       .selectAll('.icon')
       .data(data)
       .enter()
       .append('image')
       .attr("class", "arrow")
       .attr({
        'xlink:href': function (d) {
              return 'images/other.png';
         },
         'width' : 10,
         'height': 10
       })
       .attr("x", function(d) {
              return x(d.date)-5;
       })
       .attr("y", function(d) {
              return y(d.close)-5;
       });

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

        focus.append("circle")
      .attr("r", 4.5);

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      focus.append("line")
          .attr("x1", 0).attr("x2", 0) // vertical line so same value on each
          .attr("y1", 0).attr("y2", height); // top to bottom

      var dragged = false;

      svg.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          // .on("mouseout", function() { focus.style("display", "none"); })
      	  .on("mousedown", function() { dragged = true; })
      	  .on("mouseup", function() { dragged = false; })
          .on("mousemove", mousemove);

      function mousemove() {
        if (!dragged) return;

          var x0 = x.invert(d3.mouse(this)[0]),
              i = bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          // focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
          focus.attr("transform", "translate(" + x(d.date) + ",0)");
          focus.select("text").text(d.date);
          // console.log($("#"+d.date));
          for(var j=2; j<=countryNameArray.length-1; j++){
              var color = Math.round(scale(d[countryNameArray[j]]));
              // console.log(color);
              $('.datamaps-subunit'+'.'+countryNameArray[j]).css('fill','rgb('+color+', 0, 0)');
          }
          if($('.'+Date.parse(d.date)) != null){
              d3.selectAll("li").selectAll("p").style("color", "black");
              $('.'+Date.parse(d.date)).css('color','red');
              // console.log("OK");
          }else{
              d3.selectAll("li").selectAll("p").style("color", "black");
              // console.log("NG");
          }
      }
  });
}