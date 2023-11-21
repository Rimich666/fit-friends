import {MutableRefObject, useState, useEffect, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {MapLocation} from '../types/map-location';


export type LeafletMap = Map | null;

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: MapLocation): LeafletMap {
  const [map, setMap] = useState<Map>(null as unknown as Map);
  const isRenderedRef = useRef<boolean>(false);
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: 13,
      });
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, location]);
  return map;
}
