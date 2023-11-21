import {useEffect, useRef} from 'react';
import useMap from '../hooks/use-map';
import {UserLocationMap} from '../enums';
import {Icon, Marker} from 'leaflet';

const IconSize = {
  width: 42,
  height: 51
};

type MapPopupProps = {
  location: string;
}

export default function MapPopup({location}: MapPopupProps): JSX.Element {
  const mapRef = useRef(null);
  const center = UserLocationMap[location as keyof typeof UserLocationMap];
  const map = useMap(mapRef, center);
  useEffect(() => {
    if (map){
      const marker = new Marker([center.latitude, center.longitude], {
        icon: new Icon({
          iconUrl: '/img/sprite/icon-pin-user.svg',
          iconSize: [IconSize.width, IconSize.height],
          iconAnchor: [IconSize.width / 2, IconSize.height]
        })});
      marker.addTo(map);
    }
  }, [map, center,]);

  return (
    <div className="popup__content-map">
      <div className="popup__map" style={{height: '640px', overflow: 'hidden'}}>
        <div ref={mapRef} id={'map'} style={{height: '100%', width: '100%'}}></div>
      </div>
    </div>
  );
}
