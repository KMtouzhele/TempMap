import { useState } from "react";
import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";
import DetailIcon from "./components/DetailIcon";
import "leaflet/dist/leaflet.css";

function App() {
    const [location, setLocation] = useState([-42.9, 147.3]);
    const [mapStyle, setMapStyle] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [name, setName] = useState(null);

    const handleStyleChange = (e) => setMapStyle(e.target.value);

    const handleGetLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation([position.coords.latitude, position.coords.longitude]);
                    setLoading(false);
                },
                () => setLoading(false)
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", width: "80%", height: "80%", justifyContent: "space-between" }}>
                <MapComponent {...{ location, setLocation, temperature, setTemperature, setFeelsLike, name, setName, mapStyle,  feelsLike, loading, DetailIcon }} />
                <Sidebar {...{ handleGetLocation, handleStyleChange, loading }} />
            </div>
        </div>
    );
}

export default App;
