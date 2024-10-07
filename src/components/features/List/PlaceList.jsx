import { useState, useEffect, useRef, useMemo } from "react";
import { BounceLoader } from "react-spinners";
import useFocus from "../../../store/useFocus";
import useSearch from "../../../store/useSearch";
import PlaceCard from "./Card/PlaceCard";
import useScrollRestoration from "../../../hooks/useScrollRestoration";
import useAuth from "../../../store/useAuth";
import useAllData from "../../../store/useAllData";
import SearchEmptyList from "./SearchEmptyList";
import useScroll from "../../../store/useScroll";

export default function PlaceList({ type }) {
    const { cardRefs, setCardRef } = useScroll;
    const { focusedPlace } = useFocus();
    const { username, userage } = useAuth();
    const { searchTerm } = useSearch();
    const { AllData } = useAllData();

    // 스크롤 복원
    useScrollRestoration("placeListScroll");

    /**
     * 검색어 기반 데이터 필터링
     * @param {Array} list - 검색할 장소 데이터 목록
     * @param {string} word - 검색어
     */
    function searchPlaceList(list, word) {
        return word
            ? list.filter(
                  (item) =>
                      item.area_nm.toLowerCase().includes(word.toLowerCase()) || //장소 이름
                      item.area_congest_lvl.toLowerCase().includes(word) //장소 혼잡도
              )
            : list;
    }

    // 로컬 스토리지에서 사용자의 좋아요 장소 리스트 가져오기
    const favoritePlaces = useMemo(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        return favorites[username] || [];
    }, [username]);

    // 필터링 데이터
    const filteredData = useMemo(() => {
        return searchPlaceList(AllData, searchTerm);
    }, [AllData, searchTerm]);

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

        return [
            ...prioritizedData.filter((item) =>
                item.mostPopularAge.includes(userage)
            ),
            ...prioritizedData.filter(
                (item) => !item.mostPopularAge.includes(userage)
            ),
        ];
    }, [type, filteredData, favoritefilteredData, userage]);

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

    return (
        <div className="listcon__contentwrap">
            {dataToDisplay && dataToDisplay.length > 0 ? (
                dataToDisplay.map((value, index) => {
                    return (
                        <div key={index} ref={(el) => setCardRef(index, el)}>
                            <PlaceCard
                                key={index}
                                address={value.address}
                                mostPopularAge={value.mostPopularAge}
                                location={{ lat: value.x, lng: value.y }}
                                data={value.population}
                            />
                        </div>
                    );
                })
            ) : searchTerm !== "" && dataToDisplay.length == 0 ? (
                <SearchEmptyList />
            ) : (
                <div className="spinner">
                    <BounceLoader color="#98e0ff" />
                </div>
            )}
        </div>
    );
}
