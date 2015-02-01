/*call the init-function*/
$(init);

function init() {
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