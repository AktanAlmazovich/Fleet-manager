import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom colored markers
const createColoredIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
    });
};

const greenIcon = createColoredIcon('#22c55e');
const redIcon = createColoredIcon('#ef4444');
const grayIcon = createColoredIcon('#6b7280');

const MapView = ({ vehicles }) => {
    // Center on Bishkek, Kyrgyzstan
    const center = [42.8746, 74.5698];

    const getMarkerIcon = (status) => {
        switch (status) {
            case 'available': return greenIcon;
            case 'busy': return redIcon;
            default: return grayIcon;
        }
    };

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {vehicles.map((vehicle) => (
                    vehicle.latitude && vehicle.longitude && (
                        <Marker
                            key={vehicle.id}
                            position={[vehicle.latitude, vehicle.longitude]}
                            icon={getMarkerIcon(vehicle.status)}
                        >
                            <Popup>
                                <div className="w-56">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="w-full h-32 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="font-bold text-gray-900 text-lg">{vehicle.name}</h3>
                                    <p className="text-gray-500 text-sm font-mono">{vehicle.plate}</p>
                                    <div className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-bold ${vehicle.status === 'available'
                                            ? 'bg-green-100 text-green-800'
                                            : vehicle.status === 'busy'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {vehicle.status === 'available' ? 'Свободна' : vehicle.status === 'busy' ? 'В рейсе' : 'На ТО'}
                                    </div>
                                    {vehicle.driver && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-medium">Водитель:</span> {vehicle.driver}
                                        </p>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
