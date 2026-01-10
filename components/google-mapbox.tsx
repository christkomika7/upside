"use client";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { env } from "@/env.config";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "./ui/spinner";

type GoogleMapProps = {
  value?: number[];
  handleChange: (coords: [number, number]) => void;
};

export default function GoogleMapbox({ handleChange, value }: GoogleMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: [],
  });

  const center = useMemo(() => ({ lat: 1.0, lng: 11.75 }), []);
  const [markerPos, setMarkerPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (value) setMarkerPos({ lat: value[0], lng: value[1] });
  }, []);
  return (
    <>
      {!isLoaded && (
        <p className="flex items-center gap-x-1 text-neutral-500 text-sm">
          <Spinner size="small" className="text-neutral-500" />
          Chargement de la carte...
        </p>
      )}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: 4,
          }}
          center={markerPos || center}
          zoom={markerPos ? 12 : 5.5}
          onClick={(e) => {
            const coords = e.latLng?.toJSON();
            if (coords) {
              setMarkerPos(coords);
              handleChange([coords.lat, coords.lng]);
            }
          }}
        >
          {markerPos && <MarkerF position={markerPos} />}
        </GoogleMap>
      )}
    </>
  );
}
