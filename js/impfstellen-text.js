/*call the init-function*/
$(init);

function init() {
	/*register the key event (anonymous function)*/
	$('#search-field').keyup(function() {
        var searchVal = $(this).val();
        
        var options = {url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json"};
        $.ajax(options).done(function(data) {
            updateData(data, searchVal);
        });
    });

    /*get data from open data service*/
    var options = {url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json"};
    $.ajax(options).done(onReceiveComplete);
}

function onReceiveComplete(data) {
    //print formatted table
    var htmlTable = "<table border='1'><thead><td>Bezeichnung</td><td>Adresse</td></thead>";

    $.each(data.features, function(i, value) {
        htmlTable += "</a><tr><td><a target='_blank' href='"+value.properties.WEBLINK1+"'>"+value.properties.BEZEICHNUNG+"</a></td><td>"+value.properties.ADRESSE+"</td></tr>";
    });

    htmlTable += "</table>";
    $("#impfstellen").html(htmlTable);
}

function updateData(data, val) {
    /*function to be called after the search content changed*/
    $("#impfstellen").empty();
    var htmlTable = "<table border='1'><thead><td>Bezeichnung</td><td>Adresse</td></thead>";

    $.each(data.features, function(i, value) {
    	if (((value.properties.BEZEICHNUNG.toLowerCase()).search((val.toLowerCase())) != -1) || ((value.properties.ADRESSE.toLowerCase()).search((val.toLowerCase())) != -1)) {
        htmlTable += "</a><tr><td><a target='_blank' href='"+value.properties.WEBLINK1+"'>"+value.properties.BEZEICHNUNG+"</a></td><td>"+value.properties.ADRESSE+"</td></tr>";
    	}
    });

    htmlTable += "</table>";
    $("#impfstellen").html(htmlTable);
}