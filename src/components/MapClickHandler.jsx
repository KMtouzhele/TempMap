import { useMapEvents } from "react-leaflet";
import { getCurrentWeather } from "../services/weatherService";

const MapClickHandler = ({ setLocation, setTemp, setFeelsLike }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setLocation([lat, lng]);
            console.log('Click:' + lat + ',' + lng);
            const data = await getCurrentWeather(lat, lng);
            if (data && data.main) {
                const tempCelsius = (data.main.temp - 273.15);
                const feelsLikeCelsius = (data.main.feels_like - 273.15);
                console.log('Temp:' + tempCelsius + ', Feels Like:' + feelsLikeCelsius);
                setTemp(`${tempCelsius.toFixed(1)} °C`);
                setFeelsLike(`${feelsLikeCelsius.toFixed(1)} °C`);
            } else {
                setTemp("N/A");
                setFeelsLike("N/A");
            }
        },
    });

    return null;
};
export default MapClickHandler;