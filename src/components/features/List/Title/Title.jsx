import "./Title.css";
import useAuth from "../../../../store/useAuth";
import PlaceTitle from "./PlaceTitle";
import FavoriteTitle from "./FavoriteTitle";
import FestivalTitle from "./FestivalTitle";

export default function Title({ type }) {
    const { isLoggedIn, username, userage } = useAuth();

    return (
        <div>
            <div className="title">
                {isLoggedIn ? (
                    <div className="title-login">
                        안녕하세요{" "}
                        <span className="title__main__blue">{username}</span>님!
                        <div className="title-login__desc">
                            현재{" "}
                            <span className="title__main__blue">{userage}</span>
                            에게 인기가 많은 곳들을 확인해보시겠어요?
                        </div>
                    </div>
                ) : (
                    <div className="title-login">
                        안녕하세요!{" "}
                        <span className="title__main__blue">{username}</span>
                        <div className="title-login__desc">
                            <span className="title__main__blue">로그인</span>
                            하시고 맞춤 정보를 추천받아보세요!
                        </div>
                    </div>
                )}

                {type === "favorite" ? (
                    <FavoriteTitle />
                ) : type === "place" ? (
                    <PlaceTitle />
                ) : (
                    <FestivalTitle />
                )}
            </div>
        </div>
    );
}
