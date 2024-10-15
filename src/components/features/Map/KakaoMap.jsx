import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import PlacePopup from "./PlacePopup";
import useMapCenter from "../../../store/useMapCenter";
import useAllData from "./../../../store/useAllData";

export default function KakaoMap() {
    const [setLevel] = useState(6);
    const { mapCenter, mapLevel } = useMapCenter();

    const { AllData } = useAllData();

    const zoomIn = () => {
        setLevel((prevLevel) => Math.max(prevLevel - 1, 1)); // 최소 레벨 1
    };

    const zoomOut = () => {
        setLevel((prevLevel) => Math.min(prevLevel + 1, 14)); // 최대 레벨 14
    };

    return (
        <div className="kakaomap">
            <Map
                center={mapCenter}
                level={mapLevel}
                style={{ width: "100%", height: "100%" }}
            >
                {AllData &&
                    AllData.map((value, index) => (
                        <PlacePopup
                            key={index}
                            content={value.area_nm}
                            lat={value.x}
                            lng={value.y}
                            mostPopularAge={value.mostPopularAge}
                            congestion={value.congestion_color}
                        />
                    ))}
            </Map>
        </div>
    );
}
