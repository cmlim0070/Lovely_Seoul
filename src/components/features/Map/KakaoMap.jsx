import { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import useFetch from "../../../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PlacePopup from "./PlacePopup";
import ky from "ky";
import FestivalPopup from "./FestivalPopup";
import hotspotdata from "../../../data/hotspot116.json";
import { fetchAll } from "../../../utils/fetchAll";

const centerOfSeoul = {
    lat: 37.5665,
    lng: 126.978,
};

export default function KakaoMap(props) {
    const [level, setLevel] = useState(6);
    // const [hotspotDataList, setHotspotDataList] = useState([]);

    //초기 위치 정보 데이터
    const { data, isLoading, error } = useFetch(
        "hotspotMark",
        `https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true`
    );

    // const queryClient = useQueryClient();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (data && data.row) {
    //             const promises = data.row.map(async (element) => {
    //                 const url = `/api/fetchPlacePopulationData?placeName=${element.area_nm}`;
    //                 // const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/5/${element.area_nm}`;
    //                 const response = await ky.get(url).json();
    //                 console.log(response);
    //                 return { area: element, populationData: response };
    //             });

    //             const results = await Promise.all(promises);

    //             queryClient.setQueryData(["hotspotMark"], (oldData) => {
    //                 return {
    //                     ...oldData,
    //                     populationData: results,
    //                 };
    //             });
    //         }
    //     };
    //     fetchData();
    // }, [data, queryClient]);

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
                center={centerOfSeoul}
                level={level}
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
