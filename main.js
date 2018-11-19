var stylingArray = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#bdbdbd"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }]
  },
  {
    "featureType": "road.arterial",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#dadada"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "featureType": "road.local",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#c9c9c9"
    }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  }
]
var map;
var marks = [];


//A Mark Object. Contains informatino to make a marker on the map (Not all of which is used yet.)
var Mark = function (map, latLng, draggable, type, user, color) {
  this.map = map;
  this.type = type;
  this.latLng = latLng;
  this.draggable = draggable;
  this.user = user;
  this.color = color; //TODO: Make a fillcolor thing
}
//returns a type of mark called a normal mark. (Draggable, normal image.)
var makeNormalMark = function (map, latLng, user, markList) {
  normalType = "Normal";
  let normalMark = new Mark(map, latLng, true, normalType, user, "Red");
  if (markList) {
    markList.push(normalMark);
  } else{
    return normalMark;
  }
}

//loads a marker then returns the marker
var loadMarker = function(mark,map){
  let newMarker = new google.maps.Marker({
    map: map,
    position: mark.latLng,
    draggable: mark.draggable,
  });
  return newMarker;
}
//Loads all the markers, and returns a completed list of markers.
var loadMarkers = function(markList, map){
  loadedMarkers = []
  for(mark of markList){
    let newMarker = loadMarker(mark,map);
    loadedMarkers.push(newMarker);
  }
  return loadedMarkers;
};

function initMap() {
  map = new google.maps.Map(document.getElementById('main-map'), {
    center: {
      lat: 37,
      lng: -95.7
    },
    zoom: 5,
    styles: stylingArray,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    scaleControl: true
  });
  map.addListener('click', function (e) {
    let clickPos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    mark = makeNormalMark(map,clickPos,"John")
    loadMarker(mark,map);
  });
}