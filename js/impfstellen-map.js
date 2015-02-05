/*call the init-function when the page is loaded*/
$(init);

/*gobal variables*/
var impfMap;
var vacSites;
var mapMarkers = [];
var infoWindows = [];
var defaultZoomLevel = 11;
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

	/*TODO: probably save data to local storage in future*/

	addMapMarkers();
}

function addMapMarkers() {
	/*Default location in case the user does not want to use geolocation*/
	var myLatlng = new google.maps.LatLng(48.209272, 16.37280);

	var mapOptions = {
		zoom : defaultZoomLevel,
		center : myLatlng
	};

	$.each(vacSites.features, function(index, value) {
		console.log(index + " - " + value);
	});
	$.each(vacSites.features, drawMarker);
}

function drawMarker(index, value) {
	/*get position of new marker*/
	var myLatlng = new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]);

	/*get the current desired icon size*/
	var iconSize = getIconSize();

	/*build up the icon to show on the map*/
	var syringeIcon = {
		url : 'img/syringe-s.png',
		scaledSize : new google.maps.Size(iconSize, iconSize)
	};

	/*add a new marker for the current object*/
	var marker = new google.maps.Marker({
		position : myLatlng,
		map : impfMap,
		title : value.properties.BEZEICHNUNG,
		icon : syringeIcon,
	});

	/*add the marker to the existing markers*/
	mapMarkers.push(marker);

	/*create a new info window*/
	var infoWindow = new google.maps.InfoWindow({
		content : "<p>" + value.properties.BEZEICHNUNG + "</p><a href=\"" + value.properties.WEBLINK1 + "\">Weblink</a><p>" + value.properties.ADRESSE + "</p>"
	});

	/*add the new infoWindow to the existing windows*/
	infoWindows.push(infoWindow);

	/*add a click event listener for the marker, to open the window*/
	google.maps.event.addListener(marker, 'click', function() {
		/*check if any other window is open and close it if so*/
		if (activeWindow != undefined) {
			activeWindow.close();
		}
		infoWindow.open(impfMap, marker);
		activeWindow = infoWindow;
	});
}

function initializeMap() {
	/*set center of Map to Vienna*/
	var myLatlng = new google.maps.LatLng(48.209272, 16.37280);
	var mapOptions = {
		zoom : defaultZoomLevel,
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
	var bEnableHighAccurace = $("#chkHighAccuracy").is(':checked');

	var geoOptions = {
		enableHighAccuracy : bEnableHighAccurace,
		maximumAge : 3000,
		timeout : 15000
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPositionOnMap, geoLocationError, geoOptions);
	} else {
		/*TODO: add proper errorhandling*/
		alert("Your browser does not support geolocation!");
	}

}

/*change to the users current position on the map*/
function showPositionOnMap(position) {
	/*get latitude and longitude of users position*/
	var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	/*if user changed the zoom level lower than default, zooming has to be done*/
	if (impfMap.getZoom() == defaultZoomLevel || impfMap.getZoom() < 10) {
		var mapOptions = {
			zoom : 14,
			center : myLatLng
		};
	} else {
		var mapOptions = {
			center : myLatLng
		};
	}

	impfMap.setOptions(mapOptions);

	/*either add the marker for users position, or change its position*/
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

/*function for error handling during geolocation request
 * TODO: add proper error handler (instead of alert)
 */
function geoLocationError(error) {
	
	//alert(error.code);
	switch(error.code) {
	case error.PERMISSION_DENIED:
		//alert("Please allow geolocation!");
		$('#errorText').text("Standortbestimmung ist nicht zugelassen!");
		$('#errorBar').addClass("message-bar-visible");
		$('#errorBar').removeClass("message-bar-hidden");
		$('#errorBar').animate({
			marginTop: -2,
			opacity: 1.0
			}, 1500);
		window.setTimeout(hideErrorBar, 3000);
		break;
	case error.POSITION_UNAVAILABLE:
		//alert("Your position could not be determined!");
		$('#errorText').text("Ihre Position konnte nicht ermittelt werden.");
		$('#errorBar').addClass("message-bar-visible");
		$('#errorBar').removeClass("message-bar-hidden");
		$('#errorBar').animate({
			marginTop: -2,
			opacity: 1.0
			}, 1500);
		window.setTimeout(hideErrorBar, 3000);
		break;
	case error.TIMEOUT:
		//alert("Your location could not be determined in reasonable time!");
		$('#errorText').text("Standortbestimmung konnte nicht zeitgerecht durchgef�hrt worden!");
		$('#errorBar').addClass("message-bar-visible");
		$('#errorBar').removeClass("message-bar-hidden");
		$('#errorBar').animate({
			marginTop: -2,
			opacity: 1.0
			}, 1500);
		window.setTimeout(hideErrorBar, 3000);
		break;
	case error.UNKNOWN_ERROR:
		alert("An unknown error occured!");
		break;
	default:
		alert("An unknown error occured!");
	}
}

function hideErrorBar() {
	$('#errorBar').animate({
		marginTop: -20,
		opacity: 0.0
	}, 1500, function() {
		$('#errorText').text("");
		$('#errorBar').addClass("message-bar-hidden");
		$('#errorBar').removeClass("message-bar-visible");	
	});
}

function clickNextLocation() {
	var geo_options = {
		enableHighAccuracy : false,
		maximumAge : 3000,
		timeout : 6000000
	};
	console.log("geolocation");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showNextLocation, geoLocationError);
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
	//alert("shortest distance: " + shortestDistance + "km, to " + shortestDistanceText + "Lat: " + shortestDistanceLat + "Long:" + shortestDistanceLng);
	$('#errorText').text("Die nächste Impfstelle ist " + shortestDistance.toFixed(2) + "km entfernt, bitte wenden Sie sich an " + shortestDistanceText);
	$('#errorBar').addClass("message-bar-visible"); //todo: keine rote farbe hier
	$('#errorBar').removeClass("message-bar-hidden");
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
