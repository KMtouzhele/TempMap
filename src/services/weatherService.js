import axios from "axios";

const APIKEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const getCurrentWeather = async (lat, lon) => {
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat,
                lon,
                appid: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting weather: ", error);
        return null;
    }
};

export { getCurrentWeather };