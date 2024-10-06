//문화행사 리스트 카드
import "./Card.css";
import { useState, useEffect } from "react";
import arrowimg from "../../../../assets/아코디언화살표.svg";

export default function FestivalCard({ data }) {
    const { EVENT_NM, EVENT_PERIOD, EVENT_PLACE, THUMBNAIL, URL } = data || {};

    return (
        <div className="fescard">
            <div className="fescard__wrap">
                <div className="fescard__imgwrap">
                    <img src={THUMBNAIL} className="placecard__img"></img>
                </div>
                <div className="fescard__content">
                    <div>
                        <div className="fescard__title">{EVENT_NM}</div>
                        <div className="fescard__location">{EVENT_PLACE}</div>
                        <span className="fescard__period">{EVENT_PERIOD}</span>
                    </div>
                    <div className="fescard__linkcon">
                        <button
                            className="fescard__link"
                            onClick={() => {
                                window.open(URL);
                            }}
                        >
                            자세히보기
                            <img src={arrowimg}></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
