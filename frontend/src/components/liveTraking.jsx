import React, { useEffect, useRef } from 'react';
import tt, { Marker } from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import socket from "../services/Socket.service";
import { connectSocket, receiveMessage, sendMessage } from '../store/SocketSlice';
import { useDispatch } from 'react-redux';

function LiveTracking() {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const userMarker = useRef(null);
  const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

  useEffect(() => {
    mapInstance.current = tt.map({
      key: TOMTOM_API_KEY,
      container: mapContainer.current,
      center: [77.5946, 12.9716], 
      zoom: 14
    });

    connectSocket(dispatch);

    socket.on("receive-location", (message) => {
      const { latitude, longitude } = message;
      mapInstance.current.setCenter([longitude, latitude]);
      if (userMarker.current) {
        userMarker.current.setLngLat([longitude, latitude]);
      } else {
        userMarker.current = new tt.Marker({ color: "blue" })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance.current);
      }
    });

    // Function to update position
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendMessage({
            event: "send-location",
            data: {latitude, longitude}
          });
          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          }
          if (mapInstance.current) {
            mapInstance.current.setCenter([longitude, latitude]);
          }
        },
        (error) => {
          console.error('Error obtaining location', error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    };

    // Update location every 10 seconds
    const intervalId = setInterval(updatePosition, 10000);

    // Initial position update
    updatePosition();

    return () => {
      clearInterval(intervalId);
      socket.off("receive-location");
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [TOMTOM_API_KEY]);

  return (
    <div className='h-full'>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

export default LiveTracking;