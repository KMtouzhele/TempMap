const Sidebar = ({ location, handleGetLocation, handleStyleChange, loading }) => {
    return (
        <div style={{ width: "20%", height: "100%", paddingLeft: 20 }}>
            <div style={{ display: "flex", gap: "10px" }}>
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
    );
};

export default Sidebar;
