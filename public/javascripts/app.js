var map, lat, lng;
//Variable de posiciones en Array
var positions = [];

// Center points
lat = 18.4953778;
lng = -69.8668407; 

/** 
 * This function takes an array of encoded paths and returns a merged path of all of them 
 * @param {string} enc_paths - The array of encoded paths
 * @return {string} The combination of all the paths
*/
 var merge_encoding = function(enc_paths){
    points = [];
    for(var i in enc_paths){
        enc_path = enc_paths[i];
        if(i < 1){
            p = map.geometry.decodePath(enc_path);
            p.forEach(function(e){ points.push(e); });
        }else{
            p = map.geometry.decodePath(enc_path);
            latLongPoints = p.slice(1).map(function(e){ return new google.maps.LatLng(e.lat(), e.lng());});
            p.slice(1).forEach(function(e){ points.push(e); });
        }
    }
    return google.maps.geometry.encoding.encodePath(points);
}

/**
 * Draws a polyline to the specified map
 * @param {google.maps.map} - Map
 * @param {string} poly - Encoded polyline string
*/
var draw_map = function(map, poly, color){
    color = (color || '#0F0FFF');
    var points = map.geometry.decodePath(poly).map(function(e){return [e.lat(), e.lng()];});
    map.drawPolyline({
        path: points,
        strokeColor: color,
        strokeOpacity: 0.6,
        strokeWeight: 5
    });
}
 
$(function(){
    function drawRoute(map, pos){   //Funcion de posicionamiento de coordenadas iniciales            
        var prevPos, actualPos;
        
        for(var i in pos){
            actualPos = pos[i];
            
            if(i < 1){
                prevPos = actualPos;
            }
            
            map.drawRoute({
              origin: [prevPos.lat, prevPos.lng],  // origen en coordenadas anteriores
              // destino en coordenadas del click o toque actual
              destination: [actualPos.lat, actualPos.lng],
              travelMode: 'driving',
              strokeColor: '#000000',
              strokeOpacity: 0.5,
              strokeWeight: 5
            });
            
            prevPos = { 
                lat: actualPos.lat, 
                lng: actualPos.lng 
            } ;

            positions.push({ 
                lat: actualPos.lat, 
                lng: actualPos.lng 
            });
            map.addMarker({ 
                lat: actualPos.lat, 
                lng: actualPos.lng 
            });
            lat = actualPos.lat;
            lng = actualPos.lng;
        }
    }

    function enlazarMarcador(e){
       // muestra ruta entre marcas anteriores y actuales
        if(positions.length < 1){
            lat = e.latLng.lat();
            lng = e.latLng.lng();
        }
        
        map.drawRoute({
          origin: [lat, lng],  // origen en coordenadas anteriores
          // destino en coordenadas del click o toque actual
          destination: [e.latLng.lat(), e.latLng.lng()],
          travelMode: 'driving',
          strokeColor: '#000000',
          strokeOpacity: 0.5,
          strokeWeight: 5
        });

        lat = e.latLng.lat();
        lng = e.latLng.lng();

        positions.push({ lat: lat, lng: lng});
        map.addMarker({ lat: lat, lng: lng });  // pone marcador en mapa
    };

    function geolocalizar(){
        map = new GMaps(
            {
              el: "#map",
              lat: lat,
              lng: lng,
              click: enlazarMarcador,
              tap: enlazarMarcador,
              zoom: 12
            });
        map.cleanRoute();
       
    };

    function limpiar(){
        //Limpiar las posiciones y redibujar el mapa
        map.removePolylines();
        map.removeRoutes();
        map.removeMarkers(map.markers);
        positions = [];
        // Mantain data field
        document.getElementById("data").value = "";
    };

    function remove(){
        pos = positions.slice(0, positions.length - 1);
        limpiar(true);
        drawRoute(map, pos)  
        generateEncodedPath();
    };  
    
    function generateEncodedPath(){
        routes = [];
        map.routes.forEach(function(e){ routes.push(e.overview_polyline); });
        if(routes.length > 0){
            document.getElementById("data").value = merge_encoding(routes);
        }
    }

    $("#clear").on('click', limpiar);  
    $("#clear").on('tap', limpiar);
    $("#delete").on('click', remove);
    $("#delete").on('tap', remove);
    $("#generate").on('click', generateEncodedPath);
    $("#generate").on('tap', generateEncodedPath);
    geolocalizar();

  
});