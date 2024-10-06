import { Link } from "react-router-dom";
import "./ListContainer.css";
import Title from "./Title/Title";
import { useState, useEffect, useRef } from "react";
import useFocus from "../../../store/useFocus";
import PlaceList from "./PlaceList";
import FestivalList from "./FestivalList";
import FavoriteList from "./FavoriteList";

export default function ListContainer({ type }) {
    const { focusedPlace } = useFocus();

    useEffect(() => {
        const savedScrollPosition = localStorage.getItem("scrollPosition");
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }

        return () => {
            localStorage.setItem("scrollPosition", window.scrollY);
        };
    }, []);

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
