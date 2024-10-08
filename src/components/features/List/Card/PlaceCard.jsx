import { useState, useEffect } from "react";
import "./Card.css";
import Graph from "./Graph";
import arrowimg from "../../../../assets/아코디언화살표.svg";
import favorite from "../../../../assets/좋아요 비활성.svg";
import activeFavorite from "../../../../assets/좋아요 활성.svg";
import useAuth from "./../../../../store/useAuth";
import useFocus from "../../../../store/useFocus";
import useMapCenter from "../../../../store/useMapCenter";

/**
 * @param {Object} data 장소에 대한 정보 객체
 * @param {Object} location 장소의 위도, 경도 정보
 * @param {string} mostPopularAge 해당 장소에서 가장 인기 있는 연령대
 */
export default function PlaceCard({ data, address, mostPopularAge, location }) {
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

    const ingURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${AREA_NM}.jpg`;

    const [isSelected, setSelected] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { setFocusedPlace } = useFocus();
    const { setMapCenter, setMapLevel } = useMapCenter();
    const { isLoggedIn, username } = useAuth();
    const { lat, lng } = location;

    /**
     * 카드 클릭 시 확장 섹션 토글
     */
    function handleClick() {
        setSelected(!isSelected);
        if (!isSelected) {
            setMapCenter(location);
            setMapLevel(3);
            setFocusedPlace(AREA_NM);
        }
    }

    /**
     * 가장 한산한 시간 도출
     */
    const notBusyTime = FCST_PPLTN.reduce((min, current) =>
        Number(current.FCST_PPLTN_MAX) < Number(min.FCST_PPLTN_MAX)
            ? current
            : min
    );

    /**
     * 즐겨찾기 추가/제거 토글 함수
     * - 로그인된 사용자만 사용 가능하며, 즐겨찾기 상태를 로컬스토리지에 저장
     */
    const toggleFavorite = () => {
        if (!isLoggedIn) {
            alert("로그인 후 사용 가능합니다!");
            return;
        }

        setIsFavorited((prev) => {
            const newFavoriteStatus = !prev;
            const favorites =
                JSON.parse(localStorage.getItem("favorites")) || {};

            if (newFavoriteStatus) {
                if (!favorites[username]) {
                    favorites[username] = [];
                }
                favorites[username].push(AREA_NM);
            } else {
                if (favorites[username]) {
                    favorites[username] = favorites[username].filter(
                        (place) => place !== AREA_NM
                    );
                }
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            return newFavoriteStatus;
        });
    };

    /**
     * 컴포넌트 마운트 시 로컬스토리지에서 즐겨찾기 상태를 불러옴
     */
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        if (favorites[username] && favorites[username].includes(AREA_NM)) {
            setIsFavorited(true);
        }
    }, [AREA_NM, username]);

    return (
        <div className="placecard" onClick={() => handleClick()}>
            <>
                <div className="placecard__wrap">
                    <div
                        className="placecard__favorite"
                        onClick={(e) => {
                            e.stopPropagation(); //이벤트 버블링 막기
                            toggleFavorite();
                        }}
                    >
                        <img
                            src={isFavorited ? activeFavorite : favorite}
                            alt="favorite"
                        />
                    </div>
                    <div className="placecard__imgwrap">
                        <img src={ingURL} className="placecard__img"></img>
                    </div>
                    <div className="placecard__content">
                        <div className="placecard__title">{AREA_NM}</div>
                        <div className="placecard__location">{address}</div>
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
                            <div
                                className={`content__label-congest ${AREA_CONGEST_LVL}`}
                            >
                                {AREA_CONGEST_LVL}
                            </div>
                            <div
                                className={`content__label-age age${mostPopularAge}`}
                            >
                                {mostPopularAge}한테 인기 많아요
                            </div>
                        </div>
                    </div>
                </div>
                <div className="placecard__wrap2">
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
        </div>
    );
}
