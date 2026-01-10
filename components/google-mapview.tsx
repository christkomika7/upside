"use client";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { env } from "@/env.config";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "./ui/spinner";
import Image from "next/image";
import { MapPinHouseIcon, MapPinIcon, X } from "lucide-react";

type MarkerData = {
  lat: number;
  lng: number;
  title: string;
  image: string;
};

type GoogleMapProps = {
  value?: MarkerData[];
  rounded?: number;
};

export default function GoogleMapview({ value = [], rounded }: GoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: [],
  });

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userLocationName, setUserLocationName] =
    useState<string>("Ma position");
  const mapRef = useRef<google.maps.Map | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Obtenir la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(pos);

          // Optionnel: Géocodage inverse pour obtenir le nom du lieu
          if (isLoaded && window.google) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: pos }, (results, status) => {
              if (status === "OK" && results?.[0]) {
                setUserLocationName(results[0].formatted_address);
              }
            });
          }
        },
        (error) => {
          console.log("Erreur de géolocalisation:", error);
        }
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    if (value.length > 0) {
      setMarkers(value);
    }
  }, [value]);

  // Fonction pour convertir lat/lng en position pixel
  const getPixelPosition = (lat: number, lng: number) => {
    if (!mapRef.current) return null;

    const projection = mapRef.current.getProjection();
    if (!projection) return null;

    const bounds = mapRef.current.getBounds();
    if (!bounds) return null;

    const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
    const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
    const scale = Math.pow(2, mapRef.current.getZoom()!);

    const worldPoint = projection.fromLatLngToPoint(
      new google.maps.LatLng(lat, lng)
    );

    if (!worldPoint || !bottomLeft || !topRight) return null;

    return {
      x: (worldPoint.x - bottomLeft.x) * scale,
      y: (worldPoint.y - topRight.y) * scale,
    };
  };

  // Gérer le clic sur un marqueur
  const handleMarkerClick = (index: number, lat: number, lng: number) => {
    if (selectedMarker === index) {
      setSelectedMarker(null);
      setPopupPosition(null);
    } else {
      setSelectedMarker(index);
      // Petit délai pour s'assurer que la carte est prête
      setTimeout(() => {
        const pixelPos = getPixelPosition(lat, lng);
        if (pixelPos) {
          setPopupPosition(pixelPos);
        }
      }, 100);
    }
  };

  // Créer des icônes personnalisées
  const createCustomIcon = (isUserLocation = false) => {
    if (!isLoaded || !window.google) return undefined;

    const iconColor = isUserLocation ? "#3B82F6" : "#14B8A6";
    const iconSize = isUserLocation ? 40 : 35;

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="white" stroke="${iconColor}" stroke-width="3"/>
          <circle cx="20" cy="20" r="12" fill="${iconColor}"/>
          <path d="M16 16 L24 20 L16 24 Z" fill="white" transform="${isUserLocation ? "rotate(0 20 20)" : "rotate(-45 20 20)"}"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(iconSize, iconSize),
      anchor: new window.google.maps.Point(iconSize / 2, iconSize / 2),
    };
  };

  // Déterminer le centre de la carte
  const getMapCenter = () => {
    if (userPosition) return userPosition;
    if (markers.length > 0) return markers[0];
    return { lat: 0, lng: 0 };
  };

  // Fermer la popup quand on clique sur la carte
  const handleMapClick = () => {
    setSelectedMarker(null);
    setPopupPosition(null);
  };

  return (
    <>
      {!isLoaded && (
        <p className="flex items-center gap-x-1 text-neutral-500 text-sm">
          <Spinner size="small" className="text-neutral-500" />
          Chargement de la carte...
        </p>
      )}
      {isLoaded && (
        <div className="relative w-full h-full">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: rounded ? rounded : 4,
            }}
            center={getMapCenter()}
            zoom={6}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onClick={handleMapClick}
          >
            {/* Marqueur pour la position de l'utilisateur */}
            {userPosition && (
              <MarkerF
                position={userPosition}
                icon={createCustomIcon(true)}
                onClick={() =>
                  handleMarkerClick(-1, userPosition.lat, userPosition.lng)
                }
                title="Ma position"
              />
            )}

            {/* Marqueurs pour les propriétés */}
            {markers.map((marker, index) => (
              <MarkerF
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={createCustomIcon(false)}
                onClick={() => handleMarkerClick(index, marker.lat, marker.lng)}
                title={marker.title}
              />
            ))}
          </GoogleMap>

          {/* Popup fixe positionnée au-dessus de la carte */}
          {selectedMarker !== null && (
            <div className="z-10 absolute inset-0 pointer-events-none">
              {selectedMarker === -1 && userPosition ? (
                <div
                  className="absolute pointer-events-auto"
                  style={{
                    left: "50%",
                    top: "20px",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="relative bg-white shadow-xl p-4 border border-gray-100 rounded-xl min-w-[250px]">
                    <button
                      onClick={() => {
                        setSelectedMarker(null);
                        setPopupPosition(null);
                      }}
                      className="top-2 right-2 absolute hover:bg-gray-100 p-1 rounded-full transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinIcon size={18} className="text-blue-500" />
                      <h3 className="font-semibold text-gray-800 text-base">
                        Ma Position
                      </h3>
                    </div>
                    <p className="pr-6 text-gray-600 text-sm">
                      {userLocationName}
                    </p>
                  </div>
                </div>
              ) : selectedMarker !== null && markers[selectedMarker] ? (
                <div
                  className="absolute pointer-events-auto"
                  style={{
                    left: "50%",
                    top: "20px",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="relative bg-white shadow-xl p-4 border border-gray-100 rounded-xl min-w-[280px]">
                    <button
                      onClick={() => {
                        setSelectedMarker(null);
                        setPopupPosition(null);
                      }}
                      className="top-2 right-2 absolute hover:bg-gray-100 p-1 rounded-full transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPinHouseIcon size={18} className="text-teal-500" />
                      <h3 className="font-semibold text-gray-800 text-base">
                        Propriété
                      </h3>
                    </div>
                    <Image
                      src={markers[selectedMarker].image}
                      alt={markers[selectedMarker].title}
                      width={220}
                      height={140}
                      className="mb-3 rounded-lg w-full object-cover"
                    />
                    <p className="pr-6 font-medium text-gray-700 text-sm text-center">
                      {markers[selectedMarker].title}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
}
