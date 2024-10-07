import { Outlet } from "react-router-dom";
import KakaoMap from "../components/features/Map/KakaoMap";
import "./Home.css";

export default function Home() {
    return (
        <div className="content">
            <Outlet />
            <KakaoMap></KakaoMap>
        </div>
    );
}
