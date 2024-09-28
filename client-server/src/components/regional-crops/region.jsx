import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ setMapCenter, setMarkerDetails }) {
  const [position, setPosition] = useState(null);
  const [details, setDetails] = useState({ name: "", description: "" });

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      setMarkerDetails({ position: e.latlng, details });
    },
    locationfound(e) {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setMarkerDetails({ position, details: { ...details, [name]: value } });
  };

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          setMapCenter([newPosition.lat, newPosition.lng]);
          setMarkerDetails({ position: newPosition, details });
        },
      }}
    >
      <Popup>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={details.description}
              onChange={handleDetailsChange}
            />
          </label>
        </div>
      </Popup>
    </Marker>
  );
}

export default function Region({ onFetchCrops }) {
  const [mapCenter, setMapCenter] = useState([27.7172, 85.324]); // Default center: Kathmandu
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [markerDetails, setMarkerDetails] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter([latitude, longitude]); // Center the map on user's location
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  const handleFetchCrops = () => {
    if (markerDetails) {
      const { lat, lng } = markerDetails.position;
      onFetchCrops(lat, lng);
    }
  };

  return (
    <div className="flex flex-col m-2 p-2 mt-10">
      <h1 className="text-center text-2xl">स्थान-आधारित क्रप खोजकर्ता</h1>
      <p className="text-center">
        आफ्नो स्थान छान्नुहोस् र आफ्नो स्थानको लागि उत्तम के हो पत्ता
        लगाउनुहोस्।
      </p>

      {/* Display user location */}
      <div className="m-2 p-2">
        <h2 className="text-lg">तपाईंको वर्तमान स्थान:</h2>
        {userLocation.latitude && userLocation.longitude ? (
          <p>
            अक्षांश: {userLocation.latitude}, रेखांश: {userLocation.longitude}
          </p>
        ) : (
          <p>स्थान पत्ता लगाइरहेको छ...</p>
        )}
      </div>

      <div className="m-2 p-2">
        <h2 className="text-lg">चयन गरिएको स्थान:</h2>
        {markerDetails ? (
          <div>
            <p>{markerDetails.details.name}</p>
            <p>
              अक्षांश: {markerDetails.position.lat}, रेखांश:
              {markerDetails.position.lng}
            </p>
          </div>
        ) : (
          <p>कुनै स्थान सुरक्षित गरिएको छैन।</p>
        )}
      </div>
      <button
        className="text-center bg-blue-500 text-white p-2 rounded"
        onClick={handleFetchCrops}
      >
        यस स्थानको बाली हेर्नुहोस्
      </button>

      {/* OpenStreetMap Section */}
      <div className="m-2 p-2 border rounded-lg">
        <h2 className="text-lg">नक्सामा हेर्नुहोस्</h2>
        <MapContainer center={mapCenter} zoom={10} className="h-96 rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerDetails && (
            <Marker position={markerDetails.position}>
              <Popup>
                <div>
                  <h3>{markerDetails.details.name}</h3>
                  <p>{markerDetails.details.description}</p>
                </div>
              </Popup>
            </Marker>
          )}
          <LocationMarker
            setMapCenter={setMapCenter}
            setMarkerDetails={setMarkerDetails}
          />
        </MapContainer>
      </div>
    </div>
  );
}
