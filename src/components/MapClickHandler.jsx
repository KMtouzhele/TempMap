import { useMapEvents } from "react-leaflet";
import { getCurrentWeather } from "../services/weatherService";
import { getLocationName } from "../services/locationNameService";

const MapClickHandler = ({ setLocation, setName, setTemp, setFeelsLike }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setLocation([lat, lng]);
            console.log('Click:' + lat + ',' + lng);
            const weatherData = await getCurrentWeather(lat, lng);
            const locationNameObject = await getLocationName(lat, lng);
            if (!weatherData) {
                setTemp("N/A");
                setFeelsLike("N/A");
                return;
            }
            if (!locationNameObject || locationNameObject.length === 0) {
                setName("N/A");
                return;
            }
            const tempCelsius = (weatherData.main.temp - 273.15);
            const feelsLikeCelsius = (weatherData.main.feels_like - 273.15);
            const locationName = locationNameObject[0].name
            setTemp(`${tempCelsius.toFixed(1)} °C`);
            setFeelsLike(`${feelsLikeCelsius.toFixed(1)} °C`);
            setName(locationName);
        },
    });

    return null;
};
export default MapClickHandler;