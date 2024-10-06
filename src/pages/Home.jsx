import { Outlet } from "react-router-dom";
import ListContainer from "../components/features/List/ListContainer";
import KakaoMap from "../components/features/Map/KakaoMap";
import "./Home.css";
import LoginModal from "../components/common/Login/LoginModal";

export default function Home() {
    return (
        <div className="content">
            <Outlet />
            <KakaoMap></KakaoMap>
        </div>
    );
}
