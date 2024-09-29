import "./Header.css";
import Logo from "../../../components/common/Logo";
import favorite from "../../../assets/favorite.svg";

export default function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <Logo />
                <div className="search">
                    <div className="search__input"></div>
                    <div className="search__button"></div>
                </div>
            </div>
            <div className="header__right">
                <div className="favorite">
                    <div className="favorite__button">
                        <img src={favorite} className="favorite__icon" />
                        <span>MY</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
