import { useState, useEffect } from "react";
import {
    Map,
    MapMarker,
    useMap,
    RemovableCustomOverlayStyle,
} from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import useFetch from "../../../hooks/useFetch";
import { useQuery } from "react-query";
import PlacePopup from "./PlacePopup";
import EventMarkerContainer from "./PlacePopup";

const centerOfSeoul = {
    lat: 37.5665,
    lng: 126.978,
};

export default function KakaoMap(props) {
    const [level, setLevel] = useState(8);

    const { data, isLoading, error } = useFetch(
        "hotspotMark",
        `https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true`
    );

    const zoomIn = () => {
        setLevel((prevLevel) => Math.max(prevLevel - 1, 1)); // 최소 레벨 1
    };

    const zoomOut = () => {
        setLevel((prevLevel) => Math.min(prevLevel + 1, 14)); // 최대 레벨 14
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log("마커찍기", data);

    return (
        <div className="kakaomap">
            <RemovableCustomOverlayStyle />
            <Map
                center={centerOfSeoul}
                level={level}
                style={{ width: "100%", height: "100%" }}
            >
                {data.row.map((value, index) => (
                    <EventMarkerContainer
                        key={index}
                        content={value.area_nm}
                        lat={value.x}
                        lng={value.y}
                    />
                ))}
            </Map>
        </div>
    );
}
