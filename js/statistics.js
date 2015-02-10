$(document).ready(initChart);

function initChart() {
	var options = {
		dataType : 'jsonp',
		type : 'GET',
		url : "http://pta.public.linz.at/vacSites/getStatistics.php"
	};

	$.ajax(options).done(prepareData);
}

function prepareData(data) {
	var statisticData = [8];
	var valueCount = 0;
	for (var i = 0; i < 8; i++) {
		statisticData[i] = 0;
	}
	$.each(data, function(index,v) {
		if (v.fsmeVaccinated && v.fsmeVaccinated.substring(0, 4) != '0000') {
			statisticData[0]++;
		}
		if (v.diphVaccinated && v.diphVaccinated.substring(0, 4) != '0000') {
			statisticData[1]++;
		}
		if (v.tetVaccinated && v.tetVaccinated.substring(0, 4) != '0000') {
			statisticData[2]++;
		}
		if (v.polioVaccinated && v.polioVaccinated.substring(0, 4) != '0000') {
			statisticData[3]++;
		}
		if (v.hepAVaccinated && v.hepAVaccinated.substring(0, 4) != '0000') {
			statisticData[4]++;
		}
		if (v.hepBVaccinated && v.hepBVaccinated.substring(0, 4) != '0000') {
			statisticData[5]++;
		}
		if (v.measlesVaccinated && v.measlesVaccinated.substring(0, 4) != '0000') {
			statisticData[6]++;
		}
		if (v.rubelleVaccinated && v.rubelleVaccinated.substring(0, 4) != '0000') {
			statisticData[7]++;
		}
		valueCount++;
	});	
	prepareChart(statisticData, valueCount);
}

function prepareChart(statisticData, valueCount) {
	var width = 1024, barHeight = 50;
	var statisticCaptions = ['FSME', 'Diphtherie', 'Tetanus', 'Polio', 'HepA', 'HepB', 'Masern', 'Roeteln'];
	
	var chart = d3.select("#vaccinationStats").attr("width", width).attr("height", barHeight * statisticData.length);
	$.each(statisticData, function(index, v) {
		chart.append("rect").attr("width", (v * width) / valueCount).attr("height", barHeight).attr("y", barHeight * index).attr("x", 0);
		chart.append("text").attr("y", (barHeight * index) + 30).attr("x", 5).text(statisticCaptions[index]).attr("class", "vacc-text");
		chart.append("text").attr("y", (50 * index) + 30).attr("x", width).text(v).attr("class", "absolute-number");
	});
	
	$("#total-number").text(valueCount);
	$(".total-number-div").toggleClass("visible hidden");
}