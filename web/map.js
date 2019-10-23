
// initial vars for the map
var current_measure = "Z1" // measure initially shown
var all_measure_ids = ['Z1','Z2','Z3','C1','C2'] // list of measures
var current_year = "2016_Q1"

// setting up the map :)
mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1c3lsYWIiLCJhIjoiY2syMHN2dDloMHN0bjNjbWZkbWhhOHVkNCJ9.aVlLc2d3hTzAZRhDd_NSfw';
var map = new mapboxgl.Map({
    container: 'map', // div id
    style: 'mapbox://styles/sausylab/ck222f21b0kwe1cpb6rj0c4xz',

    zoom: 4, // starting zoom
    maxZoom: 13, // max zoom
    minZoom: 3.5,
    pitchWithRotate: false,
    attributionControl: true,
    maxBounds: [
        [-160, 30], // Southwest
        [-25, 84]  // Northeast
    ],
    center: [-93, 55], // starting location
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

bar = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
  });
map.addControl(bar);

// add a search bar to the map
map.addControl(new MapboxGeocoder({
  accessToken: 'pk.eyJ1Ijoic2F1c3lsYWIiLCJhIjoiY2syMHN2dDloMHN0bjNjbWZkbWhhOHVkNCJ9.aVlLc2d3hTzAZRhDd_NSfw',
  mapboxgl: mapboxgl,
  countries: "ca",
  marker: false,
  // types: ['country', 'region', 'postcode'],
  // region: "Canada",
}), 'top-left');





// selecting different measures
function measure_switch(metric_name) {
  console.log(metric_name)
  current_measure = metric_name

  // set color of button
    for (var qq = 0; qq < all_measure_ids.length; qq++) {
      if (metric_name == all_measure_ids[qq]) {
        // changing opacity of buttons
        document.getElementById(all_measure_ids[qq]).style.opacity = '1.0';
        document.getElementById(all_measure_ids[qq]).style.color = '#db0049';
        }
      else {
        document.getElementById(all_measure_ids[qq]).style.opacity = '1.0';
        document.getElementById(all_measure_ids[qq]).style.color = 'black';
        }
    }

  var_name = current_measure + "_" + current_year
  console.log(var_name)

  style_info = [
    "case",
    [
      ">",
      ["get", var_name],
      1.5
    ],
    "#06a772",
    [
      ">",
      ["get", var_name],
      0.5
    ],
    "hsl(153, 100%, 73%)",
    [
      ">",
      ["get", var_name],
      -0.5
    ],
    "hsl(343, 3%, 93%)",
    [
      ">",
      ["get", var_name],
      -1.5
    ],
    "hsl(343, 100%, 81%)",
    "#db0049"
  ]

  map.setPaintProperty('da', 'fill-color',style_info)

  // change variable on the map
  // lists all the layers map.getStyle().layers
}


// gets all data in the view window -might be useful for viz
// map.querySourceFeatures('composite', {
//   'sourceLayer': 'da'
// });


// hover pink over the selected metric
function textcolouron(id_name) {
  document.getElementById(id_name).style.color = '#db0049';
}
function textcolouroff(id_name) {
  var mes_index = all_measure_ids.indexOf(id_name);
  if (all_measure_ids[mes_index] == current_measure) {
    document.getElementById(id_name).style.color = '#db0049';
    document.getElementById(id_name).style.opacity = '1.0';
  }
  else {
    document.getElementById(id_name).style.color = 'black';
    document.getElementById(id_name).style.opacity = '1.0';
  }
}





// select dauid boundary when clicked with a black outline
var selected_dauid = ""
map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['da'] });
    if (!features.length) {
        return;
    }
    if (typeof map.getLayer('selected_da') !== "undefined" ){
        map.removeLayer('selected_da')
        map.removeSource('selected_da');
    }

    var feature = features[0];
    if (selected_dauid == feature.properties.dauid) {
      map.removeLayer('selected_da')
      // map.removeSource('selected_da');
      selected_dauid = ""
    }

    else {

      selected_dauid = feature.properties.dauid

      map.addSource('selected_da', {
          "type":"geojson",
          "data": feature.toJSON()
      });
      map.addLayer({
          "id": "selected_da",
          "type": "line",
          "source": "selected_da",
          "paint": {
            "line-color": "black",
            "line-width": 4
          }
      });
    }

});
