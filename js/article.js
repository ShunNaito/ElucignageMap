var parseDate = d3.time.format("%Y-%m-%d").parse;

		function displayText(){
			// データを読み込む
		    d3.csv("./Ebola.csv", function(error, data) {
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
     				// .attr("class", "article")
     				.text(function(d) { return d.text});
				// for(var i=0; i<=data.length-1; i++){
				// 	var $div = $('<div>')
		  //       		.attr({"id": d[i].date,
		  //       			"class": 'article'});
			 //        $div.append(d[i].text+'<br>');
			 //        $('#articlePane').append($div);
			 //    }
			});
		}