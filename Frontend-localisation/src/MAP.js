import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749, // Latitude of the center point
  lng: -122.4194 // Longitude of the center point
};

const markers = [
  {
    position: { lat: 37.7749, lng: -122.4194 }, // Latitude and longitude of the marker
    title: 'Marker 1'
  },
];

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB5elPgCtl5JlcrQBgMQxWUFjnI7eUYZ7U">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} title={marker.title} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;