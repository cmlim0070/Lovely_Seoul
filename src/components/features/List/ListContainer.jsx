import { Link } from "react-router-dom";
import { useEffect } from "react";
import useFocus from "../../../store/useFocus";
import Title from "./Title/Title";
import PlaceList from "./PlaceList";
import FestivalList from "./FestivalList";
import "./ListContainer.css";
import useAllData from "../../../store/useAllData";
import useScrollRestoration from "../../../hooks/useScrollRestoration";

export default function ListContainer({ type }) {
    const { focusedPlace } = useFocus();

    //스크롤 복원
    // useScrollRestoration("placeListScroll");
    // useEffect(() => {
    //     const savedScrollPosition = sessionStorage.getItem("placeListScroll");
    //     if (savedScrollPosition) {
    //         setTimeout(() => {
    //             window.scrollTo(0, parseInt(savedScrollPosition, 10));
    //         }, 0);
    //     }
    //     return () => {
    //         const currentScrollY = window.scrollY;
    //         console.log("Saving scroll position:", currentScrollY); // 현재 스크롤 위치 로그
    //         localStorage.setItem("scrollPosition", currentScrollY);
    //     };
    // }, []);

    return (
        <div className="listcon">
            <Title type={type}></Title>
            {type != "favorite" && focusedPlace !== null && (
                <div className="buttoncon">
                    <Link to="/">
                        <button className="buttoncon__nowlocation">
                            현재위치
                        </button>
                    </Link>
                    <Link to="/festivals">
                        <button className="buttoncon__festival">
                            문화행사
                        </button>
                    </Link>
                </div>
            )}
            <div className="listcon__list">
                {type === "favorite" ? (
                    <PlaceList type="favorite" />
                ) : type === "place" ? (
                    <PlaceList />
                ) : (
                    <FestivalList />
                )}
            </div>
        </div>
    );
}
