import "./Title.css";
import useAuth from "../../../../store/useAuth";

export default function FavoriteTitle() {
    const { username } = useAuth();

    return (
        <div>
            <div className="title__main">
                <span className="title__main__blue">{username}</span>님이 찜한
                목록이에요!
            </div>
            <div className="title__desc">
                저희가 한눈에 보실 수 있도록 모아봤어요!
            </div>
        </div>
    );
}
