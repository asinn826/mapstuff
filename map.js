var _infowindow;
var _geocoder;
var _map;
var _circles = [];

function initMap() {
    var seattle = {lat: 47.611857, lng: -122.332987};
    _map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: seattle
    });
    plotConnectorStops();
    plotRoute545Stops();
    _infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(_map, 'click', function() {
        _infowindow.close();
    });

    _geocoder = new google.maps.Geocoder();
    plotApartments();
};

function plotConnectorStops() {
    var busImage = 'assets/bus.png'
    for (var i = 0; i < _connectorStops.length; i++) {
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

function plotRoute545Stops() {
    var busImage = 'assets/transit.png'
    for (var i = 0; i < _busStops545.length; i++) {
        var latLong = { lat: _busStops545[i].Latitude, lng: _busStops545[i].Longitude };
        var marker = new google.maps.Marker({
            position: latLong,
            map: _map,
            info: '<b>' + _busStops545[i].name + '</b>',
            icon: busImage
        });
        google.maps.event.addListener(marker, 'click', function() {
            _infowindow.setContent(this.info);
            _infowindow.open(_map,this);
        });
    }
}

function plotApartments() {
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

function buttonClickHandler() {
    for (var i = 0; i < _circles.length; i++) {
        _circles[i].setMap(null);
    }
    var input = parseInt(document.getElementById('radiusInput').value);
    var array = _connectorStops.concat(_busStops545);
    for (var i = 0; i < array.length; i++) {
        var latLong = { lat: array[i].Latitude, lng: array[i].Longitude };
        var cityCircle = new google.maps.Circle({
            strokeColor: '#0080ff',
            strokeOpacity: 0.3,
            strokeWeight: 1,
            fillColor: '#00bfff',
            fillOpacity: 0.15,
            map: _map,
            center: latLong,
            radius: input
        });
        _circles.push(cityCircle);
    }
}
