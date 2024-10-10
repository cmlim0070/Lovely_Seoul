import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import useFetch from "../../../hooks/useFetch";
import PlacePopup from "./PlacePopup";
import useMapCenter from "../../../store/useMapCenter";

export default function KakaoMap(props) {
    const [setLevel] = useState(6);
    const { mapCenter, mapLevel } = useMapCenter();
    // const map = useMap();

    // useEffect(()=>{
    //     map.
    // },[mapCenter])

    //App.jsx에서 받아오기 때문에 그걸로 변경해서 바인딩해야됨
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
            <Map
                center={mapCenter}
                level={mapLevel}
                style={{ width: "100%", height: "100%" }}
            >
                {data.row.map((value, index) => (
                    <PlacePopup
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
