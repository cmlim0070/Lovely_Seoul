import { useState, useEffect } from "react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import ky from "ky";
import useFocus from "../../../store/useFocus";
import useFes from "../../../store/useFes";

import "./KakaoMap.css";
import FestivalPopup from "./FestivalPopup";

const apiKey = import.meta.env.VITE_SEOUL_API_KEY;

export default function PlacePopup({ lat, lng, index, content }) {
    const map = useMap();
    const imgURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${content}.jpg`;

    const { focusedPlace, setFocusedPlace } = useFocus();
    const [isVisible, setIsVisible] = useState(false);
    const { fesDataList, setfesDataList } = useFes();

    const getFestivalData = async (name) => {
        const fesURL = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${name}`;
        const response = await ky.get(fesURL).json();
        setfesDataList(response.CITYDATA.EVENT_STTS);
        return response.CITYDATA.EVENT_STTS;
    };

    // useEffect(() => {
    //     if (fesDataList) {
    //         console.log("focused 문화행사", fesDataList); // 상태 업데이트 이후의 값
    //     }
    // }, [fesDataList]);

    // useEffect(() => {
    //     // focusedPlace가 존재하고 isVisible이 true일 때만 데이터 패치
    //     if (focusedPlace && isVisible) {
    //         getFestivalData(focusedPlace);
    //     }
    // }, [focusedPlace, isVisible]);

    function handleClick() {
        getFestivalData(content);
        setFocusedPlace(content);
        setIsVisible((prev) => !prev);
    }

    return (
        <>
            {/* 장소 마커 */}
            <MapMarker
                key={content}
                position={{
                    lat: lat,
                    lng: lng,
                }}
                image={{
                    src: "/placepin.svg", // 마커이미지의 주소입니다
                    size: {
                        width: 40,
                        height: 40,
                    }, // 마커이미지의 크기입니다
                    options: {
                        offset: {
                            x: 20,
                            y: 30,
                        }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                }}
                style={{
                    zIndex: 2,
                }}
                // @ts-ignore
                onClick={(marker) => {
                    handleClick();
                    map.panTo(marker.getPosition());
                }}
            ></MapMarker>
            {/* 장소 핀 오버레이 */}
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
            {/* 문화행사 마커*/}
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
