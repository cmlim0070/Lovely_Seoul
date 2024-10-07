import { useState, useEffect, useRef, useMemo } from "react";
import { BounceLoader } from "react-spinners";
import useFocus from "../../../store/useFocus";
import useSearch from "../../../store/useSearch";
import PlaceCard from "./Card/PlaceCard";
import useScrollRestoration from "../../../hooks/useScrollRestoration";
import useAuth from "../../../store/useAuth";
import useAllData from "../../../store/useAllData";

export default function PlaceList({ type }) {
    console.log("리스트타입 : ", type);

    const cardRefs = useRef([]);
    const { focusedPlace } = useFocus();
    const { username, userage } = useAuth();
    const { searchTerm } = useSearch();
    const { AllData } = useAllData();

    useEffect(() => {
        console.log("AllData in PlaceList: ", AllData); // AllData 출력 확인
        cardRefs.current = new Array(AllData.length);
    }, [AllData]);

    // 스크롤 복원
    // useScrollRestoration("placeListScroll");

    // 로컬 스토리지에서 사용자의 좋아요 장소 리스트 가져오기
    const favoritePlaces = useMemo(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        return favorites[username] || [];
    }, [username]);

    // 마커 클릭한 쪽으로 스크롤 이동
    useEffect(() => {
        if (focusedPlace !== null && AllData !== null) {
            const index = AllData.findIndex(
                (item) => item.area_nm === focusedPlace
            );
            if (index !== -1 && cardRefs.current[index]) {
                cardRefs.current[index].scrollIntoView({ behavior: "smooth" });

                const scrollY =
                    cardRefs.current[index].getBoundingClientRect().top +
                    window.scrollY;
                sessionStorage.setItem("placeListScroll", scrollY);
                console.log("Saving focused place scroll position:", scrollY);
            }
        }
    }, [focusedPlace, AllData]);

    // 검색 - 데이터 필터링
    const filteredData = useMemo(() => {
        return searchPlaceList(AllData, searchTerm);
    }, [AllData, searchTerm]);

    function searchPlaceList(list, word) {
        return word
            ? list.filter(
                  (item) =>
                      item.area_nm.toLowerCase().includes(word.toLowerCase()) || //장소 이름
                      item.area_congest_lvl.toLowerCase().includes(word) //장소 혼잡도
              )
            : list;
    }

    // 즐겨찾기 리스트 필터링
    const favoritefilteredData = useMemo(() => {
        const allFilteredData = searchPlaceList(AllData, searchTerm);
        return allFilteredData.filter((item) =>
            favoritePlaces.includes(item.area_nm)
        );
    }, [AllData, searchTerm, favoritePlaces]);

    // 데이터 우선순위 정렬
    const dataToDisplay = useMemo(() => {
        const prioritizedData =
            type === "favorite" ? favoritefilteredData : filteredData;
        console.log("prioritizedData", prioritizedData);

        return [
            ...prioritizedData.filter((item) =>
                item.mostPopularAge.includes(userage)
            ),
            ...prioritizedData.filter(
                (item) => !item.mostPopularAge.includes(userage)
            ),
        ];
    }, [type, filteredData, favoritefilteredData, userage]);

    useEffect(() => {
        console.log("dataToDisplay in PlaceList: ", dataToDisplay); // dataToDisplay 출력 확인
        cardRefs.current = new Array(dataToDisplay.length);
    }, [dataToDisplay]);

    return (
        <div className="listcon__contentwrap">
            {dataToDisplay && dataToDisplay.length > 0 ? (
                dataToDisplay.map((value, index) => {
                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                        >
                            <PlaceCard
                                key={index}
                                address={value.address}
                                mostPopularAge={value.mostPopularAge}
                                data={value.population}
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
