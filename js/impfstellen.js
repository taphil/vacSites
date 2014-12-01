$(init)

function init() {
	console.log("in init function");
    //get data
    var options = { url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json" };
    $.ajax(options).done(onReceiveComplete);
    initialize();
    $('#btnGetPosition').click(getCurrentPosition);
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

/*get the users current position by HTML5 geolocation API*/
function getCurrentPosition(){
	var geo_options = {
		enableHighAccuracy: false,
		maximumAge        : 3000,
		timeout           : 6000000
	};	
	console.log("geolocation");
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPositionOnMap);
	} else {
		alert("Please activate geolocation api!");
	}
	
}

/*change to the users current position on the map*/
function showPositionOnMap(position) {
	console.log(position.coords.latitude + " - " + position.coords.longitude);
	var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); //users current position
         var mapOptions = {
             zoom: 14,
             center: myLatlng
         };
	 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
//google.maps.event.addDomListener(window, 'load', initialize);
