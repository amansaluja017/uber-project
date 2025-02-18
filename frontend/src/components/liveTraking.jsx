import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

function LiveTracking() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const marker = useRef(null);
  const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

  useEffect(() => {
  
    mapInstance.current = tt.map({
      key: TOMTOM_API_KEY,
      container: mapContainer.current,
      center: [77.5946, 12.9716], 
      zoom: 14
    });

    // Add marker
    marker.current = new tt.Marker().setLngLat(mapInstance.current.getCenter()).addTo(mapInstance.current);

    // Start watching the user's position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        marker.current.setLngLat([longitude, latitude]);
        mapInstance.current.setCenter([longitude, latitude]);
      },
      (error) => {
        console.error('Error obtaining location', error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

   
    return () => {
      navigator.geolocation.clearWatch(watchId);
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