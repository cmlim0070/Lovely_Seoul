import { useState, useEffect } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import "./KakaoMap.css";

export default function EventMarkerContainer({ lat, lng, index, content }) {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
        <MapMarker
            key={index}
            position={{
                lat: lat,
                lng: lng,
            }}
            // @ts-ignore
            onClick={(marker) => map.panTo(marker.getPosition())}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
        >
            {isVisible && content}
        </MapMarker>
    );
}
