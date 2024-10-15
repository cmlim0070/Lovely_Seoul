import { useState, useEffect } from "react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import useFocus from "../../../store/useFocus";
import useFes from "../../../store/useFes";
import "./KakaoMap.css";
import FestivalPopup from "./FestivalPopup";
import { fetchFestivalData } from "../../../utils/fetchFestivalData";
import useAuth from "../../../store/useAuth";

//개별 장소 마커 컨테이너
export default function PlacePopup({
    lat,
    lng,
    content,
    mostPopularAge,
    congestion,
}) {
    const map = useMap();
    const imgURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${content}.jpg`;
    const { focusedPlace, setFocusedPlace } = useFocus();
    const [isVisible, setIsVisible] = useState(false);
    const [isAgeVisible, setIsAgeVisible] = useState(false);
    const { isLoggedIn, userage } = useAuth();
    const { fesDataList, setfesDataList } = useFes();

    /**
     * 문화 행사 데이터 패치
     * @param {string} name - 장소 이름
     * @returns {Promise} - 문화 행사 데이터
     */
    const getFestivalData = async (name) => {
        const response = await fetchFestivalData(name);
        setfesDataList(response);
    };

    /**
     * 마커 클릭시 축제 데이터 패칭, 포커스 변경, 팝업 토글
     * @returns {void}
     */
    function handleClick() {
        setFocusedPlace(content);
        getFestivalData(content);
        setIsVisible((prev) => !prev);
    }

    // 리스트 아이템 클릭시 지도 포커싱 이벤트
    useEffect(() => {
        if (focusedPlace === content) {
            getFestivalData(content);
            setIsVisible(true);
        }
    }, [focusedPlace, content]);

    // 로그인 유저 나잇대의 핫플레이스 정보 마커 오버레이 셋팅
    useEffect(() => {
        if (isLoggedIn) {
            if (userage === mostPopularAge) {
                setIsAgeVisible(true);
            } else {
                setIsAgeVisible(false);
            }
        }
    }, [isLoggedIn, userage, mostPopularAge]);

    return (
        <>
            <MapMarker
                className="mapmarker"
                key={content}
                position={{
                    lat: lat,
                    lng: lng,
                }}
                image={{
                    src: "/placepin.svg",
                    size: {
                        width: 40,
                        height: 40,
                    },
                    options: {
                        offset: {
                            x: 20,
                            y: 30,
                        },
                    },
                }}
                onClick={(marker) => {
                    handleClick();
                    map.panTo(marker.getPosition());
                }}
            ></MapMarker>
            {isVisible && (
                <CustomOverlayMap
                    position={{
                        lat: lat,
                        lng: lng,
                    }}
                >
                    <div className="popup__wrap">
                        <div
                            className="close"
                            onClick={() => setIsVisible(false)}
                            title="닫기"
                        >
                            닫기
                        </div>
                        <div className="popup__imgwrap">
                            <img src={imgURL} className="popup__img" />
                        </div>
                        <div className="popup__title">{content}</div>
                    </div>
                </CustomOverlayMap>
            )}
            {isAgeVisible && (
                <CustomOverlayMap
                    position={{
                        lat: lat,
                        lng: lng,
                    }}
                    zIndex={-1}
                >
                    <div className="signal-container">
                        <div
                            className="signal"
                            style={{ backgroundColor: congestion }}
                        ></div>
                        <div
                            className="signal"
                            style={{ backgroundColor: congestion }}
                        ></div>
                        <div
                            className="signal"
                            style={{ backgroundColor: congestion }}
                        ></div>
                    </div>
                </CustomOverlayMap>
            )}
            {fesDataList &&
                fesDataList.map((value, index) => {
                    return (
                        <FestivalPopup
                            key={index}
                            value={value}
                        ></FestivalPopup>
                    );
                })}
        </>
    );
}
