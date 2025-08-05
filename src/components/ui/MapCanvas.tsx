// src/components/ui/MapCanvas.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface MapCanvasProps {
  pins: Pin[];
  onPinsChange: (pins: Pin[]) => void;
  onPinNameChange: (id: string, name: string) => void;
}

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 🔹 This inner component enables pin on map click
const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({
  onMapClick,
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  // ✅ Must return valid JSX element
  return <></>;
};


const MapCanvas: React.FC<MapCanvasProps> = ({ pins, onPinsChange, onPinNameChange }) => {
  const handleMapClick = (lat: number, lng: number) => {
    const newPin: Pin = {
      id: `pin-${Date.now()}`,
      name: `Stop ${pins.length + 1}`,
      lat,
      lng,
    };
    onPinsChange([...pins, newPin]);
  };

  return (
    <div className="border rounded overflow-hidden">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73992.96844429396!2d100.8836242609034!3d12.922089849736823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310295924d31d7e3%3A0xa97ff301a9bd10ff!2sPattaya%20City%2C%20Bang%20Lamung%20District%2C%20Chon%20Buri%2020150%2C%20Thailand!5e0!3m2!1sen!2sin!4v1754393650177!5m2!1sen!2sin" width="820" height="450" ></iframe>
    </div>
    
  );
};

export default MapCanvas;
