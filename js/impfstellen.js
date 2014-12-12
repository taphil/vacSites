/*call the init-function*/
$(init);

/*gobal varialbes*/
var map;
var vacs;
var activeWindow;

function init() {
	/*add event listeners*/
	$('#btnGetPosition').click(getCurrentPosition);
    $('#btnClosestLocation').click(clickNextLocation);
	
    /*get data from open data service*/
    var options = { url: "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json" };
    $.ajax(options).done(onReceiveComplete);
    
    /*initialize the google map*/
    initializeMap();
}

 function onReceiveComplete(data) {
     vacs = data;

     console.log(data);
     /*Default location in case the user does not want to use geolocation*/
     var myLatlng = new google.maps.LatLng(48.209272,16.37280); //vienna
         var mapOptions = {
             zoom: 11,
             center: myLatlng
         };
	 map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
     $.each(data.features, function(i, value) {
         var newItem = $("<li>"+ value.properties.BEZEICHNUNG + "  - " + value.properties.WEBLINK1 + "</li>");
         $("#impfstellen").prepend(newItem);

         //google map
         
         

         var myLatlng = new google.maps.LatLng(value.geometry.coordinates[1],value.geometry.coordinates[0]);
         console.log(myLatlng);
         
         //var syringeIcon = "img/syringe-s.png";         
         //syringeIcon.setSize = new google.maps.Size(16, 16);
         var syringeIcon = {
         	 url: 'img/syringe-s.png',
         	 scaledSize: new google.maps.Size(16, 16)
    		 /*size: new google.maps.Size(16, 16),
    		 origin: new google.maps.Point(0,0),
    		anchor: new google.maps.Point(0, 0)*/
         };
         //TODO: change marker size according to zoom level
         var marker = new google.maps.Marker({
             position: myLatlng,
             map: map,
             title: value.properties.BEZEICHNUNG,
             icon: syringeIcon
         });
         
         var infowindow = new google.maps.InfoWindow({
      		content: "<p>" + value.properties.BEZEICHNUNG + "</p><a href=\"" + value.properties.WEBLINK1 + "\">Weblink</a><p>" + value.properties.ADRESSE +  "</p>"
  		});

         
         google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map, marker);
  		});

         console.log(marker);
     });
 }

 function initializeMap() {
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
     console.log(map);
     map.setOptions(mapOptions);
	 //var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
//google.maps.event.addDomListener(window, 'load', initialize);

function clickNextLocation() {
    var geo_options = {
        enableHighAccuracy: false,
        maximumAge        : 3000,
        timeout           : 6000000
    };
    console.log("geolocation");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showNextLocation);
    } else {
        alert("Please activate geolocation api!");
    }
}

function showNextLocation(position) {
    var shortestDistance = 999999;
    var currentDistance;
    var shortestDistanceText;

    $.each(vacs.features, function(i, value) {
        currentDistance = distance(value.geometry.coordinates[1],value.geometry.coordinates[0], position.coords.latitude, position.coords.longitude);
        if (currentDistance < shortestDistance) {
            shortestDistance = currentDistance;
            shortestDistanceText = value.properties.BEZEICHNUNG;
        }
    });

    alert("shortest distance: " + shortestDistance + "km, to " + shortestDistanceText);
}

function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;

    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
}
