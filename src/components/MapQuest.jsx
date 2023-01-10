import React, { useEffect } from "react";

var map;
const MapQuest = ({ height, width, center, tileLayer, zoom, apiKey }) => {
  useEffect(() => {
    console.log(map); // should output the object that represents instance of Leaflet
    if (map !== undefined && map !== null) {
      map.remove(); // should remove the map from UI and clean the inner children of DOM element
      console.log(map); // nothing should actually happen to the value of mymap
    }

    //api.key
    window.L.mapquest.key = apiKey;

    //map
    map = window.L.mapquest.map("map", {
      center,
      layers: window.L.mapquest.tileLayer(tileLayer),
      zoom,
    });

    map.addControl(window.L.mapquest.control());
  }, []);

  return (
    <div id="map" style={{ width, height }}>
      <p>Map</p>
    </div>
  );
};

export default MapQuest;
