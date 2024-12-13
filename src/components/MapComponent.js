import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ lat, lng }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    if (mapContainer) {
      const map = L.map(mapContainer, {
        center: [lat, lng],
        zoom: 14,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
            '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, ' +
            '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>Location</b><br />Lat: ${lat}, Lng: ${lng}`)
        .openPopup();

      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      return () => {
        map.remove();
      };
    }
  }, [lat, lng]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default MapComponent;
