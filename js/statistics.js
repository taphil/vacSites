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
		if (v.hepAVaccinated) {
			statisticData[0]++;
			console.log(v.hepAVaccinated);
		} else {
			console.log(v.firstname);
		}
		if (v.fsmeVaccinated) {
			statisticData[1]++;
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
	var width = 420, barHeight = 20;

	var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, width]);

	var chart = d3.select("#vaccinationStats").attr("width", width).attr("height", barHeight * data.length);

	$.each(data, function(index, v) {
		/*$("#vaccinationsStats").append("<rect x='" + v + "' y='5' width='20' height='10' />");
		 console.log($("#vaccinationsStats"));
		 $("#test").append("hallo" + v);
		 console.log($("#test"));*/
		var chart2 = d3.select("#vaccinationStats");
		//chart2.append("rect x='20' y='5' width='20' height='10'");
		chart2.append("rect").attr("width", v).attr("height", 10).attr("y", 10 * index);
	});

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