var map, lat, lng, address;
//Variable de posiciones en Array
var positions = [];

// Center points
lat = 18.4953778;
lng = -69.8668407; 

function saveDrink(){
    if(map.markers.length < 1) {
        alert("Nada para guardar");
        return;
    }
    var pos = JSON.stringify({ lat: +map.markers[0].position.lat().toFixed(6), lng: +map.markers[0].position.lng().toFixed(6) });
    if(pos != ""){
        $("#dat").val(pos);
        $("#dir").val(address);
        $("#saveForm").submit();
    }
}
 
$(function(){

    function geolocalizar(){
        map = new GMaps(
            {
              el: "#map",
              lat: lat,
              lng: lng,
              click: putMarker,
              tap: putMarker,
              zoom: 12
            });
        map.cleanRoute();
    };
    
    function putMarker(e){
        map.removeMarkers();
        var marker = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            draggable: true,
            drag: function(e){
                $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+e.latLng.lat()+","+e.latLng.lng()+"&sensor=true",
                    function(data){
                        document.getElementById("direction").innerHTML = data.results[0].formatted_address; 
                });
            }
        };
        map.addMarker(marker);
        $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+e.latLng.lat()+","+e.latLng.lng()+"&sensor=true",
            function(data){
                document.getElementById("direction").innerHTML = data.results[0].formatted_address;
                address = data.results[0].formatted_address;
        });
    };
    
    $("#save").on('click', saveDrink);
    
    geolocalizar();
});