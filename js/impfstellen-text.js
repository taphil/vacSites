/*call the init-function*/
$(init);

function init() {
	$('#search-field').keyup(function() {
    var $field = $(this);

    // this is the value before the keypress
    var beforeVal = $field.val();
	//alert(beforeVal);
    /*setTimeout(function() {

        // this is the value after the keypress
        var afterVal = $field.val();
        alert(afterVal);
    }, 0);*/
   	var options = {url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json"};
    $.ajax(options).done(function(data) {
    	updateData(data, beforeVal);
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
    //print formatted table
    //alert("test " + val);
    $("#impfstellen").empty();
    var htmlTable = "<table border='1'><thead><td>Bezeichnung</td><td>Adresse</td></thead>";

    $.each(data.features, function(i, value) {
    	if (value.properties.BEZEICHNUNG.search(val) != -1) {
        htmlTable += "</a><tr><td><a target='_blank' href='"+value.properties.WEBLINK1+"'>"+value.properties.BEZEICHNUNG+"</a></td><td>"+value.properties.ADRESSE+"</td></tr>";
    	}
    });

    htmlTable += "</table>";
    $("#impfstellen").html(htmlTable);
}