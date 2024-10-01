import useFetch from "../../../hooks/useFetch";
import PlaceCard from "./Card/PlaceCard";
import "./ListContainer.css";
import Title from "./Title/Title";
import hotspotdata from "../../../data/hotspot116.json";
import { useState, useEffect, useRef } from "react";
import ky from "ky";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import useFocus from "../../../store/useFocus";

import useListState from "../../../store/useListState";
import useFes from "../../../store/useFes";
import FestivalCard from "./Card/FestivalCard";

const hotspotNameList = hotspotdata.map((item) => item.name_kr);
const apiKey = import.meta.env.VITE_SEOUL_API_KEY;

export default function ListContainer() {
    const queryClient = useQueryClient();
    const [hotspotDataList, setHotspotDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { focusedPlace, setFocusedPlace } = useFocus();
    const { fesDataList, setfesDataList } = useFes();

    //리스트 상태 관리
    // 1-전체 리스트 0-문화행사 리스트 // 3-즐겨찾기 (미구현)
    const { nowListState, setnowListState } = useListState();

    // 마커 클릭시 리스트 포커스 이벤트 참조
    const cardRefs = useRef([]);

    useEffect(() => {
        console.log("현재 리스트 상태", nowListState);
    }, [nowListState]);

    const { data: hotspotData } = useQuery({
        queryKey: ["hotspotMark"],
        queryFn: () => {
            return queryClient.getQueryData(["hotspotMark"]);
        },
        enabled: false,
    });

    useEffect(() => {
        // 마커 클릭해서 포커스 이벤트 발생하면
        if (focusedPlace !== null && hotspotDataList !== null) {
            // 데이터 리스트에서 포커스 값과 동일한 카드의 인덱스값 탐색
            const index = hotspotDataList.findIndex(
                (item) => item.area.area_nm === focusedPlace
            );
            // 인덱스 일치하는 카드가 존재 && 돔에 마운트 되어있음
            if (index !== -1 && cardRefs.current[index]) {
                // 스크롤 이벤트
                cardRefs.current[index].scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [focusedPlace, hotspotDataList]); // 데이터 업데이트시 훅 실행함

    useEffect(() => {
        if (hotspotData && hotspotData.populationData) {
            setHotspotDataList(hotspotData.populationData);
        }
    }, [hotspotData]);

    return (
        <div className="listcon">
            <Title></Title>
            {/* 포커스 데이터 있으면 버튼 컨테이너 등장하게 */}
            {focusedPlace !== null && (
                <div className="buttoncon">
                    <button
                        className="buttoncon__nowlocation"
                        onClick={() => {
                            setnowListState(1);
                        }}
                    >
                        현재위치
                    </button>
                    <button
                        className="buttoncon__festival"
                        onClick={() => {
                            setnowListState(0);
                        }}
                    >
                        문화행사
                    </button>
                </div>
            )}

            <div className="listcon__list">
                {nowListState ? (
                    // 전체 리스트
                    hotspotDataList && hotspotDataList.length > 0 ? (
                        hotspotDataList.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardRefs.current[index] = el;
                                    }}
                                >
                                    <PlaceCard
                                        key={index}
                                        data={
                                            value.populationData[
                                                "SeoulRtd.citydata_ppltn"
                                            ][0]
                                        }
                                        location={{
                                            lat: value.area.x,
                                            lng: value.area.y,
                                        }}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="spinner">
                            <BounceLoader color="#98e0ff" />
                        </div>
                    )
                ) : // 문화행사 리스트
                fesDataList && fesDataList.length > 0 ? (
                    fesDataList.map((value, index) => {
                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                            >
                                <FestivalCard data={value} key={index} />
                            </div>
                        );
                    })
                ) : (
                    <div className="spinner">
                        <BounceLoader color="#98e0ff" />
                    </div>
                )}
            </div>
        </div>
    );
}
