import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import socket from "../services/Socket.service";
import { connectSocket, sendMessage } from "../store/SocketSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function LiveTracking() {
  const { messages } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const userMarker = useRef(null);
  const endMarker = useRef(null);
  const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

  useEffect(() => {
    if (messages[0]) {
      (async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-coordinates/${messages[0]?.end}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setEnd(response.data.data[0]);
        }
      })();
    }
  }, [messages]);

  useEffect(() => {
    mapInstance.current = tt.map({
      key: TOMTOM_API_KEY,
      container: mapContainer.current,
      center: [77.5946, 12.9716],
      zoom: 14,
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
          setStart({ lat: latitude, lon: longitude });
          sendMessage({
            event: "send-location",
            data: { latitude, longitude },
          });
          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          }
          if (mapInstance.current) {
            mapInstance.current.setCenter([longitude, latitude]);
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    };
    updatePosition();

    return () => {
      socket.off("receive-location");
    };
  }, [TOMTOM_API_KEY]);

  useEffect(() => {
    if (start && end) {
      ttServices.services
        .calculateRoute({
          key: TOMTOM_API_KEY,
          traffic: true,
          locations: `${start.lon},${start.lat}:${end.lon},${end.lat}`,
        })
        .then((routeData) => {
          const geojson = routeData.toGeoJson();
          if (mapInstance.current?.getLayer("route")) {
            mapInstance.current?.removeLayer("route");
            mapInstance.current?.removeSource("route");
          }
          mapInstance.current?.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#888",
              "line-width": 8,
            },
          });
          const bounds = new tt.LngLatBounds();
          geojson.features[0].geometry.coordinates.forEach((point) => {
            bounds.extend(tt.LngLat.convert(point));
          });
          mapInstance.current.fitBounds(bounds, { padding: 50 });
        });

      if (endMarker.current) {
        endMarker.current.setLngLat([end.lon, end.lat]);
      } else {
        endMarker.current = new tt.Marker({ color: "red" })
          .setLngLat([end.lon, end.lat])
          .addTo(mapInstance.current);
      }
    }

    return () => {
      if (mapInstance.current && mapInstance.current.getLayer("route")) {
        mapInstance.current.removeLayer("route");
        mapInstance.current.removeSource("route");
      }
    };
  }, [start, end, TOMTOM_API_KEY]);

  return (
    <div className="h-full" style={{ height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default LiveTracking;
