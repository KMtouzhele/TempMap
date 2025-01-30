import L from 'leaflet';

const DetailIcon = ({ name, temperature, feelsLike }) => {
    return L.divIcon({
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
            <span style="display: block;">${name || 'Region name is not available'}</span>
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
};

export default DetailIcon;