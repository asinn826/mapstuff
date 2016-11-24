var _infowindow;
var _geocoder;
var _map;

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
    });

    _geocoder = new google.maps.Geocoder();
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