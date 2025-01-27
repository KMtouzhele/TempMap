import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const APIKEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

const getWeather = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        return await response.json();
    } catch (error) {
        console.error("Error getting weather: ", error);
        return null;
    }
};

const MapClickHandler = ({ setLocation, setTemp, setFeelsLike }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setLocation([lat, lng]);
            console.log("Clicked at: ", lat, lng);

            const data = await getWeather(lat, lng);
            if (data && data.main) {
                const tempCelsius = (data.main.temp - 273.15).toFixed(1);
                const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(1);
                setTemp(`${tempCelsius} °C`);
                setFeelsLike(`${feelsLikeCelsius} °C`);
            } else {
                setTemp('N/A');
                setFeelsLike('N/A');
            }
        },
    });

    return null;
};

function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
}

function App() {
    const [location, setLocation] = useState([-42.9, 147.3]);
    const [mapStyle, setMapStyle] = useState("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);

    const handleStyleChange = (e) => {
        setMapStyle(e.target.value);
    };

    const handleGetLocation = () => {
        console.log("Getting location...");
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation([latitude, longitude]);
                    console.log("Location: ", latitude, longitude);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting geolocation: ", error);
                    setLoading(false);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };
    const detailIcon = L.divIcon({
        className: 'custom-bubble-icon',
        html: `
            <div style="
                position: relative;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 15px;
                border-radius: 15px;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                display: inline-block;
                white-space: nowrap;
            ">
            <span style="display: block;">Temperature: ${temperature || 'Click to get temp'}</span>
            <span style="display: block;">Feels like: ${feelsLike || 'N/A'}</span>
                <div style="
                    position: absolute;
                    left: 50%;
                    bottom: -10px;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid rgba(0, 0, 0, 0.7);
                    transform: translateX(-50%);
                "></div>
            </div>`,
        iconSize: [150, 60],
        iconAnchor: [75, 60]
    });

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                width: '80%',
                height: '80%',
                justifyContent: 'space-between'
            }}>
                <div style={{ width: '80%', height: '100%' }}>
                    <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <MapUpdater center={location} />
                        <MapClickHandler setLocation={setLocation} setTemp={setTemperature} setFeelsLike={setFeelsLike} />
                        <TileLayer url={mapStyle} />
                        {temperature && (
                            <Marker position={location} icon={detailIcon}>
                                {/*<Popup>*/}
                                {/*    Temperature: {temperature}*/}
                                {/*</Popup>*/}
                            </Marker>
                        )}
                        {loading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: '20px 30px',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                zIndex: 1000
                            }}>
                                Getting your location...
                            </div>
                        )}
                    </MapContainer>
                </div>
                <div style={{ width: '20%', height: '100%', paddingLeft: 20 }}>
                    <div style={{ display: 'flex', gap: '10px'}}>
                        <h4 style={{ margin: 0 }}>Map Style</h4>
                        <select onChange={handleStyleChange}>
                            <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                                OSM Default
                            </option>
                            <option value="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png">
                                CartoDB
                            </option>
                            <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">
                                HOT Style
                            </option>
                        </select>
                    </div>
                    {loading ? <p>Getting your location...</p> : null}
                    <div>
                        <h4>Location</h4>
                        <p>Latitude: {location[0]}</p>
                        <p>Longitude: {location[1]}</p>
                    </div>
                    <button onClick={handleGetLocation}>Go back to my location</button>
                </div>
            </div>
        </div>
    );
}

export default App;
