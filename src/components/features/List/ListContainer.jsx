import { Link } from "react-router-dom";
import useFocus from "../../../store/useFocus";
import Title from "./Title/Title";
import PlaceList from "./PlaceList";
import FestivalList from "./FestivalList";
import "./ListContainer.css";
import { useState } from "react";

export default function ListContainer({ type }) {
    const { focusedPlace } = useFocus();
    const sortAgeList = ["10", "20", "30", "40", "50", "60"];
    const [selectedAges, setSelectedAges] = useState([]);

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
            {/* <div className="sortbutton">
                <div className="sortbutton__age__wrap">
                    {sortAgeList.map((age) => {
                        return (
                            <button
                                key={age}
                                className={`sortbutton__age ${
                                    selectedAges.includes(age) ? "active" : ""
                                }`}
                                data-age={age}
                            >
                                {age}대
                            </button>
                        );
                    })}
                </div>
                <div className="sortbutton__congestion"></div>
            </div> */}

            {type === "favorite" ? (
                <PlaceList type="favorite" />
            ) : type === "all" ? (
                <PlaceList type="all" />
            ) : (
                <FestivalList />
            )}
        </div>
    );
}
