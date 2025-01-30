import {
    Box,
    Button,
    Container,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography
} from '@mui/material';
import App from "../App.jsx";

const Sidebar = ({ handleGetLocation, handleStyleChange, loading }) => {
    return (
        <Box sx={{ width: '20%', height: '100%', padding: 2 }}>
            <Stack spacing={2} direction={"column"}>
                <Button variant="contained" onClick={handleGetLocation} sx={{ mt: 2 }}>Go back to my location</Button>
                <FormControl fullWidth={true}>
                    <InputLabel id="map-style-label">Map Style</InputLabel>
                    <Select
                        labelId="map-style-label"
                        id="map-style-select"
                        label="Map Style"
                        onChange={handleStyleChange}
                        defaultValue="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    >
                        <MenuItem value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">OSM Default</MenuItem>
                        <MenuItem value="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png">CartoDB</MenuItem>
                        <MenuItem value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">HOT Style</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputLabel htmlFor="location-search">Search A Location</InputLabel>
                    <Input id="location-search" />
                </FormControl>
                <Button variant={"contained"}>Search</Button>

            </Stack>
        </Box>
    );
};

export default Sidebar;