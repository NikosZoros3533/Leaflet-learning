import {
  MapContainer,
  TileLayer,GeoJSON
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import points from "./../points.json";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});




const MapComponent = () => {
  console.log(points);
  function onEachCountry(feature, layer) {
    layer.bindPopup(
      `<div>
        <h2>${feature.properties.name}</h2>
        <div style="max-height:100px; overflow:auto;">
          <p>${feature.properties.description}</p>
        </div>
      </div>`
    );
  }
  
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer
        center={[points.features[3].geometry.coordinates[1], points.features[0].geometry.coordinates[0]]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={points}
          style={() => ({
            color: "blue",
            weight: 2,
            fillColor: "blue",
            fillOpacity: 0.5,
          })}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      
    </div>
  );
};

export default MapComponent;
