//문화행사 리스트 카드
import "./Card.css";
import { useState, useEffect } from "react";

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
                    <button className="fescard__link">자세히보기</button>
                </div>
            </div>
        </div>
    );
}
