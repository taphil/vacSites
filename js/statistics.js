$(initChart);

function initChart() {
	var options = {
		dataType : 'jsonp',
		type : 'GET',
		url : "http://pta.public.linz.at/vacSites/getStatistics.php"
	};

	$.ajax(options).done(prepareData);
}

function prepareData(data) {
	console.log(data);
	console.log(data[1].firstname);
	
	var statisticData = [];
	
	for (var i = 0; i < 10; i++) {
		statisticData[i] = 0;
	}

	$.each(data, function(index,v) {
		if (v.hepAVaccinated && v.hepAVaccinated.substring(0, 4) != '0000') {
			statisticData[0]++;
			//console.log(v.hepAVaccinated);
		} else {
			//console.log(v.firstname);
		}
		if (v.fsmeVaccinated && v.fsmeVaccinated.substring(0, 4) != '0000') {
			statisticData[1]++;
			console.log("counted" + v.fsmeVaccinated);
		} else {
			console.log("did not count" + v.fsmeVaccinated);
		}
	});	
	/*for (currentObject in data) {
		console.log(currentObject[0]);
	}*/
	prepareChart(statisticData);
}

function prepareChart(statisticData) {

	var data = [4, 8, 15, 16, 23, 42];
	
	console.log(data);
	data = statisticData;
	console.log(data);
	var width = 1024, barHeight = 100;
	var statisticCaptions = ["FSME", "Hepatitis A"];
	var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, width]);

	var chart = d3.select("#vaccinationStats").attr("width", width).attr("height", barHeight * data.length);

	$.each(data, function(index, v) {
		/*$("#vaccinationsStats").append("<rect x='" + v + "' y='5' width='20' height='10' />");
		 console.log($("#vaccinationsStats"));
		 $("#test").append("hallo" + v);
		 console.log($("#test"));*/
		var chart2 = d3.select("#vaccinationStats");
		//chart2.append("rect x='20' y='5' width='20' height='10'");
		chart2.append("rect").attr("width", v * 5).attr("height", 50).attr("y", 50 * (index+1));
		chart2.append("text").attr("y", 50 * (index+1)).attr("x", 150).attr("font-size", "20px").attr("font-family", "sans-serif").style("fill", "red").text(statisticCaptions[index]);
		console.log(statisticCaptions[index]);
	});
	var chart2 = d3.select("#vaccinationStats");
	chart2.append("text").attr("y", 0).attr("dy", ".35em").attr("font-family", "sans-serif").attr("fill", "red").text("test");
	/*var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function(d, i) {
	return "translate(0," + i * barHeight + ")";
	});*/

	//bar.append("rect").attr("width", x).attr("height", barHeight - 1);

	/*bar.append("text").attr("x", function(d) {
	 return x(d) - 3;
	 }).attr("y", barHeight / 2).attr("dy", ".35em").text(function(d) {
	 return d;
	 });*/
}