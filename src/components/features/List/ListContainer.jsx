import useFetch from "../../../hooks/useFetch";
import PlaceCard from "./Card/PlaceCard";
import "./ListContainer.css";
import Title from "./Title/Title";
import hotspotdata from "../../../data/hotspot116.json";
import { useState, useEffect } from "react";
import ky from "ky";
import { useQuery } from "@tanstack/react-query";

const hotspotNameList = hotspotdata.map((item) => item.name_kr);
const apiKey = import.meta.env.VITE_SEOUL_API_KEY;

export default function ListContainer() {
    const [hotspotDataList, setHotspotDataList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    //hotspotNameList 목록을 반복하며 서울시 인구데이터의 API 정보 패칭
    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            try {
                const promises = hotspotNameList.map((placeName) => {
                    const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/5/${placeName}`;
                    const response = ky.get(url).json();
                    return response;
                });
                const results = await Promise.all(promises);
                setHotspotDataList(results);
            } catch (err) {
                // setError(err);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="listcon">
            <Title></Title>
            <div className="listcon__list">
                {hotspotDataList
                    ? hotspotDataList.map((e, index) => {
                          return (
                              <PlaceCard
                                  data={e["SeoulRtd.citydata_ppltn"][0]}
                                  key={index}
                              ></PlaceCard>
                          );
                      })
                    : console.log("리스트 데이터 불러오기 실패")}
            </div>
        </div>
    );
}
