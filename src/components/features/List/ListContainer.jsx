import { Link } from "react-router-dom";
import useFocus from "../../../store/useFocus";
import Title from "./Title/Title";
import PlaceList from "./PlaceList";
import FestivalList from "./FestivalList";
import "./ListContainer.css";

export default function ListContainer({ type }) {
    const { focusedPlace } = useFocus();

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
