import ListContainer from "../components/features/List/ListContainer";
import KakaoMap from "../components/features/Map/KakaoMap";
import "./Home.css";

export default function Home() {
    return (
        <div className="content">
            <ListContainer></ListContainer>
            <KakaoMap></KakaoMap>
        </div>
    );
}
