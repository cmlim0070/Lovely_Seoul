import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";
import useFocus from "../../../store/useFocus";
import useSearch from "../../../store/useSearch";
import PlaceCard from "./Card/PlaceCard";
import { BounceLoader } from "react-spinners";
import useScrollRestoration from "../../../hooks/useScrollRestoration";
import useAuth from "../../../store/useAuth";
import FavoriteEmptyList from "./FavoriteEmptyList";

export default function PlaceList({ type }) {
    const queryClient = useQueryClient();
    const { focusedPlace, setFocusedPlace } = useFocus();
    const [hotspotDataList, setHotspotDataList] = useState([]);
    const cardRefs = useRef([]);
    const { username, userage } = useAuth();
    const { searchTerm } = useSearch();

    const favoritePlaces = useMemo(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        return favorites[username] || [];
    }, [username]);

    useScrollRestoration("placeListScroll");

    const { data: hotspotData } = useQuery({
        queryKey: ["hotspotMark"],
        queryFn: () => {
            return queryClient.getQueryData(["hotspotMark"]);
        },
        enabled: false,
    });

    useEffect(() => {
        if (focusedPlace !== null && hotspotDataList !== null) {
            const index = hotspotDataList.findIndex(
                (item) => item.area.area_nm === focusedPlace
            );
            if (index !== -1 && cardRefs.current[index]) {
                cardRefs.current[index].scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [focusedPlace, hotspotDataList]);

    useEffect(() => {
        if (hotspotData && hotspotData.populationData) {
            const updatedData = hotspotData["populationData"].map((data) => {
                const ageDataList =
                    data.populationData["SeoulRtd.citydata_ppltn"][0];
                const ageData = [
                    {
                        age: "10대",
                        rate: Number(ageDataList.PPLTN_RATE_10) || 0,
                    },
                    {
                        age: "20대",
                        rate: Number(ageDataList.PPLTN_RATE_20) || 0,
                    },
                    {
                        age: "30대",
                        rate: Number(ageDataList.PPLTN_RATE_30) || 0,
                    },
                    {
                        age: "40대",
                        rate: Number(ageDataList.PPLTN_RATE_40) || 0,
                    },
                    {
                        age: "50대",
                        rate: Number(ageDataList.PPLTN_RATE_50) || 0,
                    },
                    {
                        age: "60대",
                        rate: Number(ageDataList.PPLTN_RATE_60) || 0,
                    },
                ];
                const mostPopularAge = ageData.reduce((max, current) =>
                    current.rate > max.rate ? current : max
                );
                return {
                    ...data,
                    mostPopularAge: mostPopularAge.age, // 예: '20대'
                };
            });
            setHotspotDataList(updatedData);
            cardRefs.current = new Array(updatedData.length);
        }
    }, [hotspotData]);

    const filteredData = useMemo(() => {
        return searchPlaceList(hotspotDataList, searchTerm);
    }, [hotspotDataList, searchTerm]);

    function searchPlaceList(list, word) {
        return word
            ? list.filter(
                  (item) =>
                      item.area.area_nm
                          .toLowerCase()
                          .includes(word.toLowerCase()) ||
                      item.populationData[
                          "SeoulRtd.citydata_ppltn"
                      ][0].AREA_CONGEST_LVL.includes(word)
              )
            : list;
    }

    const favoritefilteredData = useMemo(() => {
        const allFilteredData = searchPlaceList(hotspotDataList, searchTerm);
        return allFilteredData.filter((item) =>
            favoritePlaces.includes(item.area.area_nm)
        );
    }, [hotspotDataList, searchTerm, favoritePlaces]);

    // const dataToDisplay =
    //     type === "favorite" ? favoritefilteredData : filteredData;

    const dataToDisplay = useMemo(() => {
        const prioritizedData =
            type === "favorite" ? favoritefilteredData : filteredData;

        return [
            ...prioritizedData.filter((item) =>
                item.mostPopularAge.includes(userage)
            ),
            ...prioritizedData.filter(
                (item) => !item.mostPopularAge.includes(userage)
            ),
        ];
    }, [type, filteredData, favoritefilteredData, userage]);

    return (
        <div className="listcon__contentwrap">
            {dataToDisplay && dataToDisplay.length > 0 ? (
                dataToDisplay.map((value, index) => {
                    console.log(value);
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
                                mostPopularAge={value.mostPopularAge}
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
            )}
        </div>
    );
}
