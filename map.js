var _infowindow;
var _geocoder;
var _map;
var _circle;

function initMap() {
    var seattle = {lat: 47.611857, lng: -122.332987};
    _map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: seattle
    });
    plotConnectorStops(_map);
    _infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(_map, 'click', function() {
        _infowindow.close();
        circleCloseHandler();
    });

    _geocoder = new google.maps.Geocoder();
    _circle = new google.maps.Circle();
    plotApartments();
};

function plotConnectorStops(map) {
    var busImage = 'assets/bus.png'
    for (var i = 0; i < _connectorStops.length - 1; i++) {
        var latLong = { lat: _connectorStops[i].Latitude, lng: _connectorStops[i].Longitude };
        var marker = new google.maps.Marker({
            position: latLong,
            map: _map,
            info: '<b>' + _connectorStops[i].Name + '</b>',
            icon: busImage
        });
        google.maps.event.addListener(marker, 'click', function() {
            _infowindow.setContent(this.info);
            _infowindow.open(_map,this);
        });
        google.maps.event.addListener(marker, 'click', circleDrawHandler());
    }
};

function plotApartments() {
    console.log('rofl');
    for (var i = 0; i < _apartments.length; i++) {
        var name = _apartments[i].name;
        var address = _apartments[i].address;
        var website = _apartments[i].website;
        var latLng = { lat: _apartmentsWithLatLong[i].Latitude, lng: _apartmentsWithLatLong[i].Longitude };
        var marker = new google.maps.Marker({
            position: latLng,
            map: _map,
            info: '<h2>' + name + '</h2><h3>' + address + '</h3><a href=\'' + website + '\' target=\'_blank\'>Website</a>'
        });
        google.maps.event.addListener(marker, 'click', function() {
            _infowindow.setContent(this.info);
            _infowindow.open(_map,this);
        });
    }
};

function circleDrawHandler() {
    radius = 1; // 1km hard coded
    radius = (radius / 6378.1) * 6378100;

    // _circle.setOptions({
    //     center: e.latLng,
    //     clickable: true,
    //     draggable: false,
    //     editable: false,
    //     fillColor: '#004de8',
    //     fillOpacity: 0.27,
    //     map: _map,
    //     radius: radius,
    //     strokeColor: '#004de8',
    //     strokeOpacity: 0.62,
    //     strokeWeight: 1
    // });
}

function circleCloseHandler() {
    _circle.setMap(null);
}