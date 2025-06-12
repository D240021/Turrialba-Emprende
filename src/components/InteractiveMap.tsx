import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { entrepreneurships } from '../utils/data';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
// Create custom icon for selected marker
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
export function InteractiveMap({
  selectedId = null
}) {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  // Turrialba coordinates
  const center = [9.9046, -83.6882];
  // When a selected ID is provided, center the map on that marker
  useEffect(() => {
    if (map && selectedId) {
      const selected = entrepreneurships.find(e => e.id === selectedId);
      if (selected && selected.coordinates) {
        map.setView(selected.coordinates, 15);
      }
    }
  }, [map, selectedId]);
  return <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer center={center} zoom={12} style={{
      height: '100%',
      width: '100%'
    }} whenCreated={setMap}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {entrepreneurships.map(item => <Marker key={item.id} position={item.coordinates} icon={selectedId === item.id ? selectedIcon : new L.Icon.Default()}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-green-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                <button onClick={() => navigate(`/entrepreneurship/${item.id}`)} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>)}
      </MapContainer>
    </div>;
}