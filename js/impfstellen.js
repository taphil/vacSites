$(init)

function init() {
	console.log("in init function");
    //get data
    var options = { url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json" };
    $.ajax(options).done(onReceiveComplete);
    initialize();
}

 function onReceiveComplete(data) {
     console.log(data);
     var myLatlng = new google.maps.LatLng(48.209272,16.37280); //vienna
         var mapOptions = {
             zoom: 4,
             center: myLatlng
         };
	 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
     $.each(data.features, function(i, value) {
         var newItem = $("<li>"+ value.properties.BEZEICHNUNG + "  - " + value.properties.WEBLINK1 + "</li>");
         $("#impfstellen").prepend(newItem);

         //google map
         
         

         var myLatlng = new google.maps.LatLng(value.geometry.coordinates[1],value.geometry.coordinates[0]);
         console.log(myLatlng);
         
         var marker = new google.maps.Marker({
             position: myLatlng,
             map: map,
             title: value.properties.BEZEICHNUNG
         });
         console.log(marker);
     });
 }

 function initialize() {
 	 console.log("initialize map");
     var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
     var mapOptions = {
         zoom: 4,
         center: myLatlng
     };
     
     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

     var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title: 'Hello World!'
     });
 }

//google.maps.event.addDomListener(window, 'load', initialize);
