var infowindow;

function initMap() {
    var seattle = {lat: 47.611857, lng: -122.332987};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: seattle
    });
    plotConnectorStops(map);
    infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });
}

function plotConnectorStops(map) {
    var busImage = 'assets/bus.png'
    for (var i = 0; i < _connectorStops.length - 1; i++) {
        var latLong = { lat: _connectorStops[i].Latitude, lng: _connectorStops[i].Longitude };
        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            info: '<b>' + _connectorStops[i].Name + '</b>',
            icon: busImage
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.info);
            infowindow.open(map,this);
        });
    }
}
