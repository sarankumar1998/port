import React, { useEffect, useState } from 'react';

function Two() {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Load Google Maps API asynchronously
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=geometry`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    };

    const mapElement = document.getElementById('map');
    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);

    // Start real-time location tracking
    startTrackingLocation();
  };

  const startTrackingLocation = () => {
    if (navigator.geolocation) {
      const locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      // Use watchPosition for real-time updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setUserLocation(newPosition);

          // Update marker position on the map
          if (map) {
            const marker = new window.google.maps.Marker({
              position: newPosition,
              map: map,
            });
            map.panTo(newPosition);
          }
        },
        (error) => console.error(error),
        locationOptions
      );

      // Clean up watchId when component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Real-Time Location Tracker</h1>
      <div id="map" style={{ width: '10%', height: '40px' }}></div>
    </div>
  );
}

export default Two;
