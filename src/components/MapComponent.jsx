import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapClickHandler from "./MapClickHandler";
import MapUpdater from "./MapUpdater";
import DetailIcon from "./DetailIcon";

const MapComponent = ({
                          location,
                          setLocation,
                          setTemperature,
                          setFeelsLike,
                          mapStyle,
                          temperature,
                          feelsLike,
                          loading
}) => {
    return (
        <div style={{ width: "80%", height: "100%" }}>
            <MapContainer center={location} zoom={13} style={{ height: "100%", width: "100%" }}>
                <MapUpdater center={location} />
                <MapClickHandler setLocation={setLocation} setTemp={setTemperature} setFeelsLike={setFeelsLike} />
                <TileLayer url={mapStyle} />
                {temperature && <Marker position={location} icon={DetailIcon({ temperature, feelsLike })} />}
                {loading && (
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "20px 30px",
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                        zIndex: 1000
                    }}>
                        Getting your location...
                    </div>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;