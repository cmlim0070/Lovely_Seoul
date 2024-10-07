import { useState } from "react";
import { MapMarker, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";
import "./KakaoMap.css";

export default function FestivalPopup({ value }) {
    const map = useMap();

    const { EVENT_NM, EVENT_Y, EVENT_X, THUMBNAIL } = value || {};

    const [isFesVisible, setIsFesVisible] = useState(false);

    function handleFesClick() {
        console.log(EVENT_NM, "문화행사 클릭");
    }

    return (
        <>
            <MapMarker
                key={EVENT_NM}
                position={{
                    lat: EVENT_Y,
                    lng: EVENT_X,
                }}
                image={{
                    src: "/fespin.svg",
                    size: {
                        width: 40,
                        height: 40,
                    },
                    options: {
                        offset: {
                            x: 0,
                            y: 0,
                        },
                    },
                }}
                style={{ zIndex: "99" }}
                onClick={(marker) => {
                    map.panTo(marker.getPosition());
                    handleFesClick();
                    setIsFesVisible(true);
                }}
            />
            {isFesVisible && (
                <CustomOverlayMap
                    position={{
                        lat: EVENT_Y,
                        lng: EVENT_X,
                    }}
                    style={{ width: "20px", height: "20px" }}
                >
                    <div className="fespopup__wrap">
                        <div
                            className="close"
                            onClick={() => setIsFesVisible(false)}
                            title="닫기"
                        >
                            닫기
                        </div>
                        <div className="fespopup__imgwrap">
                            <img src={THUMBNAIL} className="fespopup__img" />
                        </div>
                        <div className="fespopup__title">{EVENT_NM}</div>
                    </div>
                </CustomOverlayMap>
            )}
        </>
    );
}
