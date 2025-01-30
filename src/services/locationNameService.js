import axios from "axios";

const APIKEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

const getLocationName = async (lat, lon) => {
    try {
        const response = await axios.get("http://api.openweathermap.org/geo/1.0/reverse", {
            params: {
                lat,
                lon,
                appid: APIKEY,
            }
        });
        console.log(response.data);
        if (response.data.length === 0) {
            console.error("No location found");
            return null;
        }
        console.log('Location Name: ' + response.data[0].name);
        return response.data;
    } catch (error) {
        console.error("Error getting location name: ", error);
        return null;
    }
};

export { getLocationName };