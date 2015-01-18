$(prepareChart);

function prepareChart() {

	var data = [4, 8, 15, 16, 23, 42];

	var width = 420, barHeight = 20;

	var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, width]);

	var chart = d3.select("#vaccinationStats").attr("width", width).attr("height", barHeight * data.length);

	$.each(data, function (index, v) {
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