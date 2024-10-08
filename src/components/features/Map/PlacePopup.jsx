import { useState, useEffect } from "react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import ky from "ky";
import useFocus from "../../../store/useFocus";
import useFes from "../../../store/useFes";

import "./KakaoMap.css";
import FestivalPopup from "./FestivalPopup";
import { fetchFestivalData } from "../../../utils/fetchFestivalData";

//개별 장소 마커 컨테이너
export default function PlacePopup({ lat, lng, content }) {
    const map = useMap();
    const imgURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${content}.jpg`;

    const { focusedPlace, setFocusedPlace } = useFocus();
    const [isVisible, setIsVisible] = useState(false);
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

    return (
        <>
            <MapMarker
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
                style={{
                    zIndex: 2,
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
