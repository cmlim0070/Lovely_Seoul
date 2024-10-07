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
        const fesURL = `/api/fetchFestivalData?placeName=${name}`;
        // const fesURL = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${name}`;
        const response = await ky.get(fesURL).json();
        setfesDataList(response.CITYDATA.EVENT_STTS);
        console.log(name, " 문화행사 : ", response.CITYDATA.EVENT_STTS);
        return response.CITYDATA.EVENT_STTS;
    };

    function handleClick() {
        getFestivalData(content);
        setFocusedPlace(content);
        setIsVisible((prev) => !prev);
    }

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
