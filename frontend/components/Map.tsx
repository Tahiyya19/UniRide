"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Center on a generic university campus location (e.g., somewhere in India as currency is INR)
// Let's use IIT Bombay coordinates as a placeholder for "University Campus"
const DEFAULT_CENTER: [number, number] = [19.1334, 72.9133];

function MapFlyTo({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15);
  }, [center, map]);
  return null;
}

export default function Map({ pickup, drop }: { pickup: string, drop: string }) {
  void pickup;
  void drop;

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/10 z-0 relative">
      <MapContainer 
        center={DEFAULT_CENTER} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={DEFAULT_CENTER}>
          <Popup>
            University Campus
          </Popup>
        </Marker>
        {/* We can add routing or more markers based on pickup/drop later */}
        <MapFlyTo center={DEFAULT_CENTER} />
      </MapContainer>
    </div>
  );
}
