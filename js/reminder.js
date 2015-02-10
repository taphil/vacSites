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

	/* add all reminders */
	if ($("#cbFSME").is(":checked")) {
        var month = getMonthFromField("currFSME");
        var yearToRe = getYearFromField("currFSME", 5);
		if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbDiphtherie").is(":checked")) {
        var month = getMonthFromField("currDiphtherie");
        var yearToRe = getYearFromField("currDiphtherie", 3);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbTetanus").is(":checked")) {
        var month = getMonthFromField("currTetanus");
        var yearToRe = getYearFromField("currTetanus", 3);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbPolio").is(":checked")) {
        var month = getMonthFromField("currPolio");
        var yearToRe = getYearFromField("currPolio", 3);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbHepA").is(":checked")) {
        var month = getMonthFromField("currHepA");
        var yearToRe = getYearFromField("currHepA", 8);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbHepB").is(":checked")) {
        var month = getMonthFromField("currHepB");
        var yearToRe = getYearFromField("currHepB", 5);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbMasern").is(":checked")) {
        var month = getMonthFromField("currMasern");
        var yearToRe = getYearFromField("currMasern", 1);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

			cal.addEvent('Auffrischung FSME', 'Für optimalen Impfschutz sollte die Impfung dieses Monat gemacht werden!', '', timeStringBegin, timeStringEnd);
		}
	}
	if ($("#cbRoeteln").is(":checked")) {
        var month = getMonthFromField("currRoetln");
        var yearToRe = getYearFromField("currRoetln", 4);
        if (month && yearToRe) {
			var timeStringBegin = month + "/" + "1" + "/" + yearToRe;
			//1 is day, always use first day
			var timeStringEnd = month + "/" + "2" + "/" + yearToRe;

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
        var val = getDateValFromField("currFSME", 5);
		if (val) {
			textToDownload += "\r\nFSME: " + val;
		}
	}
	if ($("#cbDiphtherie").is(":checked")) {
        var val = getDateValFromField("currDiphtherie", 3);
		if (val) {
			textToDownload += "\r\nDiptherie: " + val;
		}
	}
	if ($("#cbTetanus").is(":checked")) {
        var val = getDateValFromField("currTetanus", 3);
		if (val) {
			textToDownload += "\r\nTetanus: " + val;
		}
	}
	if ($("#cbPolio").is(":checked")) {
        var val = getDateValFromField("currPolio", 3);
		if (val) {
			textToDownload += "\r\nPolio: " + val;
		}
	}
	if ($("#cbHepA").is(":checked")) {
        var val = getDateValFromField("currHepA", 8);
		if (val) {
			textToDownload += "\r\nHepatitis A: " + val;
		}
	}
	if ($("#cbHepB").is(":checked")) {
        var val = getDateValFromField("currHepB", 5);
		if (val) {
			textToDownload += "\r\nHepatitis B: " + val;
		}
	}
	if ($("#cbMasern").is(":checked")) {
        var val = getDateValFromField("currMasern", 1);
		if (val) {
			textToDownload += "\r\nMasern: " + val;
		}
	}
	if ($("#cbRoeteln").is(":checked")) {
        var val = getDateValFromField("currRoeteln", 4);
		if (val) {
			textToDownload += "\r\nRöteln: " + val;
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

function getDateValFromField(fieldName, yearsToRe) {
    var val = $("#"+fieldName).val();
    if (val) {
        //val is now YYYY-MM
        var month = val.substring(5);
        var year = parseInt(val.substring(0, 4));
        if (month && year) {
            var yearToRe = year + yearsToRe;
            return month + "/" + yearToRe;
        }
    }
}

function getMonthFromField(fieldName) {
    var val = $("#"+fieldName).val();
    if (val) {
        //val is now YYYY-MM
        var month = val.substring(5);
        if (month) {
            return month;
        }
    }
}

function getYearFromField(fieldName, yearsToRe) {
    var val = $("#"+fieldName).val();
    if (val) {
        //val is now YYYY-MM
        var year = parseInt(val.substring(0, 4));
        if (year) {
            return (year + yearsToRe);
        }
    }
}

function saveVaccinationData() {
	var accessStrings = ['FSME', 'Diphtherie', 'Tetanus', 'Polio', 'HepA', 'HepB', 'Masern', 'Roeteln'];
	var dateValues = [accessStrings.length];
	var i = 0;
	var cbString, currString, dateString;
	
	for (i = 0; i < accessStrings.length; i++) {
		cbString = '#cb' + accessStrings[i];
		currString = 'curr' + accessStrings[i];
		dateString = '00-00-0000';
		if ($(cbString).is(":checked")) {
			dateString = '00-' + getMonthFromField(currString) + "-" + getYearFromField(currString, 0);
		}
		dateValues[i] = dateString;
	}
	
	var postOptions = {
		dataType : 'jsonp',
		type : 'POST',
		url : "http://pta.public.linz.at/vacSites/insertStats.php",		
		data : {
			firstname : "test",
			lastname : "testlastname",
			email : "test@test.com",
			fsmeVaccinated : dateValues[0],
			diphVaccinated : dateValues[1],
			tetVaccinated : dateValues[2],
			polioVaccinated : dateValues[3],
			hepAVaccinated : dateValues[4],
			hepBVaccinated : dateValues[5],
			measlesVaccinated : dateValues[6],
			rubelleVaccinated : dateValues[7]
		}
	};
	
	$.ajax(postOptions); /*, function() {
		console.log("success");
	});*/
}