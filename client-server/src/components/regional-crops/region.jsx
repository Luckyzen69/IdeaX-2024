import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datas from "./provineceAndSeasonalCrops";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import Barley from "../../assets/crops-image/Barley.jpg";
import Cardamom from "../../assets/crops-image/Cardamom.jpg";
import Corn from "../../assets/crops-image/Corn.jpg";
import Millet from "../../assets/crops-image/Millet.jpg";
import Potato from "../../assets/crops-image/potato.jpg";
import Tea from "../../assets/crops-image/tea.jpg";
import Vegetables from "../../assets/crops-image/vegetables.jpg";
import Wheat from "../../assets/crops-image/wheat.jpg";
import Rice from "../../assets/crops-image/rice.jpg";
import Sugarcane from "../../assets/crops-image/sugarcare.jpg";
import Apple from "../../assets/crops-image/apple.jpg";
import Buckwheat from "../../assets/crops-image/Buckwheat.jpg";
import Citrus from "../../assets/crops-image/Citrus.jpg";
import Mustard from "../../assets/crops-image/mustard.jpg";
import Coffee from "../../assets/crops-image/coffee.jpg";
import Pulse from "../../assets/crops-image/Pulse.jpg";
import Orange from "../../assets/crops-image/orange.jpg";
import Tomato from "../../assets/crops-image/tomato.jpg";
import Cauliflower from "../../assets/crops-image/cauliflower.jpg";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const cropImages = {
  जौ: Barley,
  अलैंची: Cardamom,
  मकै: Corn,
  कोदो: Millet,
  आलु: Potato,
  चिया: Tea,
  तरकारी: Vegetables,
  गहुँ: Wheat,
  धान: Rice,
  उखु: Sugarcane,
  स्याउ: Apple,
  फापर: Buckwheat,
  "जाँते फल": Citrus,
  तोरी: Mustard,
  कफी: Coffee,
  दलहन: Pulse,
  सुन्तला: Orange,
  टमाटर: Tomato,
  काउली: Cauliflower,
};

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

export default function Region() {
  const [selectedProvince, setSelectedProvince] = useState(Datas.provinces[0]);
  const [selectedSeason, setSelectedSeason] = useState(
    selectedProvince.seasonalCrops[0]
  );
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

  const handleProvinceChange = (e) => {
    const province = Datas.provinces.find((p) => p.name === e.target.value);
    setSelectedProvince(province);
    setSelectedSeason(province.seasonalCrops[0]);
  };

  const handleSeasonChange = (e) => {
    const season = selectedProvince.seasonalCrops.find(
      (s) => s.season === e.target.value
    );
    setSelectedSeason(season);
  };

  const handleSaveLocation = () => {
    if (markerDetails) {
      setMarkerDetails(markerDetails);
    }
  };

  const handleClearMarker = () => {
    setMarkerDetails(null);
  };

  return (
    <div className="flex flex-col m-2 p-2 mt-10">
      <h1 className="text-center text-2xl">स्थान-आधारित क्रप खोजकर्ता</h1>
      <p className="text-center">
        आफ्नो स्थान छान्नुहोस् र आफ्नो स्थानको लागि उत्तम के हो पत्ता
        लगाउनुहोस्।
      </p>
      <form className="flex flex-col justify-center m-4">
        <div className="m-2 p-2">
          <label htmlFor="province">प्रदेश</label>
          <select
            name="province"
            id="province"
            className="border rounded-md p-2 sm:ml-2"
            onChange={handleProvinceChange}
            value={selectedProvince.name}
          >
            {Datas.provinces.map((province) => (
              <option key={province.name} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2 p-2">
          <label htmlFor="season">मौसम</label>
          <select
            name="season"
            id="season"
            className="border w-56 rounded-md p-2 sm:ml-2 mr-2"
            onChange={handleSeasonChange}
            value={selectedSeason.season}
          >
            {selectedProvince.seasonalCrops.map((season) => (
              <option key={season.season} value={season.season}>
                {season.season}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="m-2 p-2">
        <h2 className="text-lg">{selectedSeason.season} को लागि बाली:</h2>
        <ul>
          {selectedSeason.crops.map((crop) => (
            <li
              key={crop}
              className="border rounded-xl p-2 m-2 sm:m-10 flex bg-white items-center"
            >
              <div className="flex flex-col sm:flex-row m-2 p-2 items-center">
                {cropImages[crop] && (
                  <img
                    src={cropImages[crop]}
                    alt={crop}
                    className="w-44 object-cover sm:ml-4 rounded-xl"
                  />
                )}
                <div className="m-2 p-2">
                  <span className="font-bold ml-2 text-primary text-xl">
                    {crop}
                  </span>
                  <p className="text-xl p-2">
                    {crop} कसरी बढाउने बारे जान्नुहोस्{" "}
                  </p>
                  <div className="flex">
                    <Link to={`/regional-crops/${crop}`}>
                      <p className="border p-2 rounded-xl text-white bg-accent hover:bg-fourth">
                        थप विवरण
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

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
            <p>
              {markerDetails.details.name}
            </p>
            <p>

            अक्षांश: {markerDetails.position.lat}, रेखांश:
              {markerDetails.position.lng}
            </p>
          </div>
        ) : (
          <p>कुनै स्थान सुरक्षित गरिएको छैन।</p>
        )}
      </div>

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
