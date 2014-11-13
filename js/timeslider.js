// タイムスライダー
		d3.csv("./Ebola.csv", function(error, data) {
		        // データをフォーマット
		        data.forEach(function(d) {
		            d.date = parseDate(d.date);
		        });

		    var min = d3.min(data, function(d) { return d.date; }).getDate();

		    var max = d3.max(data, function(d) { return d.date; }).getDate();

			d3.select('#graphPane').call(d3.slider().axis(true).min(min).max(max).step(1).on("slide", function(evt, value) {
      			d3.select('#test').text(value);
      			//　タイムスライダーの値（時系列）に応じて記事をハイライト
      			// console.log(data.length);
      			for(var i=0; i<=data.length-1; i++){
					if(value == data[i].date.getDate()){
						document.getElementById(data[i].date).style.color = "red";
					}else{
						document.getElementById(data[i].date).style.color = "black";
					}
	    		}
     //  			d3.select('span').style("color", function(d) {
     //  				console.log(d.date.getDate());
     //  				if(value == d.date.getDate()){
					// 	return red;
					// }else{
					// 	return black;
					// }
	    // 		});
    		}));
		});