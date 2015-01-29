$(init);

function init() {
	$("#subFSME").hide();
	$("#subDiphtherie").hide();
	$("#subTetanus").hide();
	$("#subPolio").hide();
	$("#subHepA").hide();
	$("#subHepB").hide();
	$("#subMasern").hide();
	$("#subRoeteln").hide();

	$("#btnIcs").click(btnIcsClick);
	$("#btnText").click(btnTextClick);
}

function cbClick(source) {
	console.log(source);

	var correctSubMenu;
	switch (source.id) {
	case "cbFSME":
		correctSubMenu = "subFSME";
		break;
	case "cbDiphtherie":
		correctSubMenu = "subDiphtherie";
		break;
	case "cbTetanus":
		correctSubMenu = "subTetanus";
		break;
	case "cbPolio":
		correctSubMenu = "subPolio";
		break;
	case "cbHepA":
		correctSubMenu = "subHepA";
		break;
	case "cbHepB":
		correctSubMenu = "subHepB";
		break;
	case "cbMasern":
		correctSubMenu = "subMasern";
		break;
	case "cbRoeteln":
		correctSubMenu = "subRoeteln";
		break;
	}

	if ($('#' + source.id).is(':checked')) {
		$("#" + correctSubMenu).fadeIn();
	} else {
		$("#" + correctSubMenu).fadeOut();
	}
}

function btnIcsClick() {
	var cal = ics();

	//TODO kernma
	/* add all reminders */
	if ($("#cbFSME").is(":checked")) {
		var val = $("#currFSME").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 5 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbDiphtherie").is(":checked")) {
		var val = $("#currDiphtherie").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbTetanus").is(":checked")) {
		var val = $("#currTetanus").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbPolio").is(":checked")) {
		var val = $("#currPolio").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbHepA").is(":checked")) {
		var val = $("#currHepA").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 8;
			//every 8 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbHepB").is(":checked")) {
		var val = $("#currHepB").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 3 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbMasern").is(":checked")) {
		var val = $("#currMasern").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 1 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbRoeteln").is(":checked")) {
		var val = $("#currRoetln").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 5 years
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "3" + "/" + yearToRe;
			//last for 3 days...
			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}

	cal.download("impf_erinnerung");
	if ($("#cbStatistic").is(":checked")) {
		saveVaccinationData();
	}
}

function btnTextClick() {
	var textToDownload = "Zusammenfassung - Auffrischungsimpfung(en):";

	if ($("#cbFSME").is(":checked")) {
		var val = $("#currFSME").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 5 years
			textToDownload += "\r\nFSME: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbDiphtherie").is(":checked")) {
		var val = $("#currDiphtherie").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			textToDownload += "\r\nDiptherie: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbTetanus").is(":checked")) {
		var val = $("#currTetanus").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			textToDownload += "\r\nTetanus: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbPolio").is(":checked")) {
		var val = $("#currPolio").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 3;
			//every 3 years
			textToDownload += "\r\nPolio: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbHepA").is(":checked")) {
		var val = $("#currHepA").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 8;
			//every 8 years
			textToDownload += "\r\nHepatitis A: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbHepB").is(":checked")) {
		var val = $("#currHepB").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 3 years
			textToDownload += "\r\nHepatitis B: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbMasern").is(":checked")) {
		var val = $("#currMasern").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 1 years
			textToDownload += "\r\nMasern: " + month + "/" + yearToRe;
		}
	}
	if ($("#cbRoeteln").is(":checked")) {
		var val = $("#currRoeteln").val();
		if (val) {
			//val is now YYYY-MM
			var month = val.substring(5);
			var year = parseInt(val.substring(0, 4));
			var yearToRe = year + 5;
			//every 5 years
			textToDownload += "\r\nRöteln: " + month + "/" + yearToRe;
		}
	}

	//create new link and download the text
	var a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([textToDownload], {
		type : 'text/plain'
	}));
	a.download = 'impf_erinnerung.txt';

	// Append anchor to body.
	document.body.appendChild(a)
	a.click();

	// Remove anchor from body
	document.body.removeChild(a)
	if ($("#cbStatistic").is(":checked")) {
		saveVaccinationData();
	}
}

function saveVaccinationData() {
	var dateString = "00-";
	var val = $("#currFSME").val();
		if (val) {
			//val is now YYYY-MM
			dateString +=  val.substring(5) + "-";
			dateString += parseInt(val.substring(0, 4));
		}
	console.log(dateString);
	
	var postOptions = {
		dataType : 'jsonp',
		type : 'POST',
		url : "http://pta.public.linz.at/vacSites/insertStats.php",		
		data : {
			firstname : "test",
			lastname : "testlastname",
			email : "test@test.com",
			fsmeVaccinated : dateString,
			hepAVaccinated : null,
			/*hepAVaccinated : dateString,
			hepBVaccinated : dateString,
			fluVaccinated : dateString*/
		}
	};
	
	/*var myDate = new Date();
	var dateString = myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();;
                console.log(dateString);
                var postOptions = {
                        dataType: 'jsonp',
                        type: 'POST',
                        url : "http://pta.public.linz.at/vacSites/insertStats.php",
                        data: {
                                firstname: "test",
                                lastname: "testlastname",
                                email: "test@test.com",
                                fsmeVaccinated: dateString,
                                hepAVaccinated: dateString,
                                hepBVaccinated: dateString,
                                fluVaccinated: dateString
                        }
                };*/

	$.ajax(postOptions); /*, function() {
		console.log("success");
	});*/
}