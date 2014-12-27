/*call the init-function*/
$(init);

/*gobal varialbes*/
var impfMap;
var vacSites;
var mapMarkers = [];
var userPositionMarker;
var activeWindow;

function init() {
	/*initialize globe variables*/
	//mapMarkes = [];

	/*add event listeners*/
	$('#btnGetPosition').click(getCurrentPosition);
	$('#btnClosestLocation').click(clickNextLocation);

	/*initialize the google map*/
	initializeMap();

	/*get data from open data service*/
	loadVacSites();
}

function loadVacSites() {
	var options = {
		url : "http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:IMPFSTELLEOGD&srsName=EPSG:4326&outputFormat=json",
	};

	$.ajax(options).done(onReceiveComplete);
}

function onReceiveComplete(data) {
	vacSites = data;

	/*probably save data to local storage in future*/
	console.log(data);

	addMapMarkers();
}

function addMapMarkers() {
	/*Default location in case the user does not want to use geolocation*/
	var myLatlng = new google.maps.LatLng(48.209272, 16.37280);
	//vienna
	var mapOptions = {
		zoom : 11,
		center : myLatlng
	};
	//map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	$.each(vacSites.features, function(index, value) {
		console.log(index + " - " + value);
	});
	$.each(vacSites.features, drawMarker);
}

function drawMarker(index, value) {
	console.log(index + " - " + value);
	var myLatlng = new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]);

	var iconSize = getIconSize();

	//console.log(myLatlng);

	var syringeIcon = {
		url : 'img/syringe-s.png',
		scaledSize : new google.maps.Size(iconSize, iconSize)
	};

	var marker = new google.maps.Marker({
		position : myLatlng,
		map : impfMap,
		title : value.properties.BEZEICHNUNG,
		icon : syringeIcon,
	});

	mapMarkers.push(marker);

	var infowindow = new google.maps.InfoWindow({
		content : "<p>" + value.properties.BEZEICHNUNG + "</p><a href=\"" + value.properties.WEBLINK1 + "\">Weblink</a><p>" + value.properties.ADRESSE + "</p>"
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(impfMap, marker);
	});

	console.log(marker);
}

function initializeMap() {
	/*set center of Map to Vienna*/
	var myLatlng = new google.maps.LatLng(48.209272, 16.37280);
	var mapOptions = {
		zoom : 11,
		center : myLatlng
	};

	/*create the map and assign to global variable*/
	impfMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	/*add event listeners*/
	google.maps.event.addListener(impfMap, 'zoom_changed', adaptZoomLevel);
}

/*determining the proper size for the marker icon*/
function getIconSize() {
	var size = 16;
	var zoomLevel = impfMap.getZoom();

	switch (zoomLevel) {
	case 11:
		size = 16;
		break;
	case 12:
		size = 20;
		break;
	case 13:
		size = 24;
		break;
	case 14:
		size = 28;
		break;
	case 15:
		size = 32;
		break;
	case 16:
		size = 36;
		break;
	case 17:
		size = 40;
		break;
	case 18:
		size = 44;
		break;
	case 19:
		size = 48;
		break;
	case 20:
		size = 52;
		break;
	case 21:
		size = 56;
		break;
	default:
		size = 16;
	}

	return size;
}

/*adapt the icon size according to zoom level*/
function adaptZoomLevel() {
	var size = getIconSize();

	var syringeIcon = {
		url : 'img/syringe-s.png',
		scaledSize : new google.maps.Size(size, size)
	};

	$.each(mapMarkers, function(index, value) {
		mapMarkers[index].setIcon(syringeIcon);
	});
}

/*get the users current position by HTML5 geolocation API*/
function getCurrentPosition() {
	//console.log("high accuracy: " + $("#chkHighAccuracy").is(':checked'));
	var bEnableHighAccurace = $("#chkHighAccuracy").is(':checked');
	var geoOptions = {
		enableHighAccuracy : bEnableHighAccurace,
		maximumAge : 3000,
		timeout : 6000000
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPositionOnMap, geoLocationError, geoOptions);
	} else {
		/*Raise error*/
		alert("Please activate geolocation api!");
	}

}

/*change to the users current position on the map*/
function showPositionOnMap(position) {
	var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	//users current position
	var mapOptions = {
		zoom : 14,
		center : myLatLng
	};

	impfMap.setOptions(mapOptions);

	if (userPositionMarker == undefined) {
		userPositionMarker = new google.maps.Marker({
			position : myLatLng,
			map : impfMap,
			title : "Ihre Position"
		});
	} else {
		userPositionMarker.setPosition(myLatLng);
	}
}

function geoLocationError() {
	alert("Geolocation error: " + error.code);
}

//google.maps.event.addDomListener(window, 'load', initialize);

function clickNextLocation() {
	var geo_options = {
		enableHighAccuracy : false,
		maximumAge : 3000,
		timeout : 6000000
	};
	console.log("geolocation");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showNextLocation);
	} else {
		alert("Please activate geolocation api!");
	}
}

function showNextLocation(position) {
	//calc next location
	var shortestDistance = 9999999;
	var currentDistance;

	var shortestDistanceText;
	var shortestDistanceLat;
	var shortestDistanceLng;

	$.each(vacSites.features, function(i, value) {
		currentDistance = distance(value.geometry.coordinates[1], value.geometry.coordinates[0], position.coords.latitude, position.coords.longitude);
		if (currentDistance < shortestDistance) {
			shortestDistance = currentDistance;
			shortestDistanceText = value.properties.BEZEICHNUNG;
			shortestDistanceLat = value.geometry.coordinates[1];
			shortestDistanceLng = value.geometry.coordinates[0];
		}
	});

	//draw line on map
	var beelineCoordinates = [new google.maps.LatLng(position.coords.latitude, position.coords.longitude), new google.maps.LatLng(shortestDistanceLat, shortestDistanceLng)];

	var beeline = new google.maps.Polyline({
		path : beelineCoordinates,
		geodesic : true,
		strokeColor : '#FF0000',
		strokeOpacity : 1.0,
		strokeWeight : 2,
		map : impfMap
	});

	//output info
	alert("shortest distance: " + shortestDistance + "km, to " + shortestDistanceText + "Lat: " + shortestDistanceLat + "Long:" + shortestDistanceLng);
}

function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1 / 180;
	var radlat2 = Math.PI * lat2 / 180;
	var radlon1 = Math.PI * lon1 / 180;
	var radlon2 = Math.PI * lon2 / 180;

	var theta = lon1 - lon2;
	var radtheta = Math.PI * theta / 180;

	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;
	return dist;
}
