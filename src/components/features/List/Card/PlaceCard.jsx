import { useState, useEffect } from "react";
import "./Card.css";
import Graph from "./Graph";
import SkeletonCard from "./SkeletonCard";
import arrowimg from "../../../../assets/아코디언화살표.svg";

export default function PlaceCard({ data, location }) {
    const {
        AREA_NM,
        AREA_CONGEST_MSG,
        FEMALE_PPLTN_RATE,
        MALE_PPLTN_RATE,
        AREA_CONGEST_LVL,
        FCST_PPLTN,
        PPLTN_RATE_0,
        PPLTN_RATE_10,
        PPLTN_RATE_20,
        PPLTN_RATE_30,
        PPLTN_RATE_40,
        PPLTN_RATE_50,
        PPLTN_RATE_60,
        PPLTN_RATE_70,
    } = data || {};

    const PPLTNData = [
        {
            age: "age",
            기타: PPLTN_RATE_0,
            "10대": PPLTN_RATE_10,
            "20대": PPLTN_RATE_20,
            "30대": PPLTN_RATE_30,
            "40대": PPLTN_RATE_40,
            "50대": PPLTN_RATE_50,
            "60대": PPLTN_RATE_60,
            "70대": PPLTN_RATE_70,
        },
    ];

    const ageData = [
        { age: "10대", rate: Number(PPLTN_RATE_10) || 0 },
        { age: "20대", rate: Number(PPLTN_RATE_20) || 0 },
        { age: "30대", rate: Number(PPLTN_RATE_30) || 0 },
        { age: "40대", rate: Number(PPLTN_RATE_40) || 0 },
        { age: "50대", rate: Number(PPLTN_RATE_50) || 0 },
        { age: "60대", rate: Number(PPLTN_RATE_60) || 0 },
    ];

    const ingURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${AREA_NM}.jpg`;
    const { lat, lng } = location;

    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSelected, setSelected] = useState(false);

    function handleClick() {
        setSelected(!isSelected);
    }

    useEffect(() => {
        // 주소 가져오기
        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(lat, lng);
        const callback = function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                setAddress(result[0].address.address_name);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }, [lat, lng]);

    const mostPopularAge = ageData.reduce((max, current) =>
        current.rate > max.rate ? current : max
    );

    const notBusyTime = FCST_PPLTN.reduce((min, current) =>
        Number(current.FCST_PPLTN_MAX) < Number(min.FCST_PPLTN_MAX)
            ? current
            : min
    );

    return (
        <div className="placecard" onClick={() => handleClick()}>
            {loading ? (
                <SkeletonCard /> // 로딩 중일 때 스켈레톤 표시
            ) : (
                <>
                    <div className="placecard__wrap">
                        <div className="placecard__imgwrap">
                            <img src={ingURL} className="placecard__img"></img>
                        </div>
                        <div className="placecard__content">
                            <div className="placecard__title">{AREA_NM}</div>
                            <div className="placecard__location">
                                {" "}
                                {loading
                                    ? "주소를 가져오는 중입니다..."
                                    : address}
                            </div>
                            <span className="placecard__desc">
                                {AREA_CONGEST_MSG}
                            </span>
                            <div className="placecard__gender">
                                <div className="placecard__gender-female">
                                    {FEMALE_PPLTN_RATE}
                                </div>
                                <div className="placecard__gender-male">
                                    {MALE_PPLTN_RATE}
                                </div>
                            </div>
                            <div className="content__label">
                                {/* 추후 클래스명 따로 매핑해주고 CSS 수정해야함*/}
                                <div
                                    className={`content__label-congest ${AREA_CONGEST_LVL}`}
                                >
                                    {AREA_CONGEST_LVL}
                                </div>
                                <div
                                    className={`content__label-age age${mostPopularAge.age}`}
                                >
                                    {mostPopularAge.age}한테 인기 많아요
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="placecard__wrap2">
                        {/* content__detail 하단은 상세보기 클릭하면 보이도록 처리 */}

                        <div
                            className={`content__detail${
                                isSelected ? "--active" : ""
                            }`}
                        >
                            <div className="content__datail__notbusy">
                                <span className="blue">
                                    {notBusyTime.FCST_TIME.slice(-5, -3)}
                                </span>
                                시에 가장 한산해요!
                            </div>
                            <div className="content__datail__graph">
                                <Graph data={PPLTNData}></Graph>
                            </div>
                            <div className="content__datail__button">
                                <img
                                    src={arrowimg}
                                    className="button__detail"
                                    onClick={() => handleClick()}
                                ></img>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
