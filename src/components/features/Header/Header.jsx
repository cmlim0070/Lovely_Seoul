import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import Logo from "../../../components/common/Logo";
import favorite from "../../../assets/favorite.svg";
import useSearch from "../../../store/useSearch";
import useModal from "../../../store/useModal";
import useAuth from "../../../store/useAuth";
import "./Header.css";
import { useCallback } from "react";

export default function Header() {
    const { setSearchTerm } = useSearch();
    const { openModal } = useModal();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    /**
     * 검색어가 변경될 때 호출
     * @param {Event} e 입력 이벤트
     */
    const handleSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
        }, 300),
        []
    );

    function handleChange(e) {
        handleSearch(e.target.value);
    }

    /**
     * 즐겨찾기 버튼 클릭 시 호출
     * 로그인 여부에 따라 페이지 이동 또는 모달 표시
     * @param {Event} e 클릭 이벤트
     */
    function handleFavoriteClick(e) {
        e.preventDefault();

        if (isLoggedIn) {
            console.log("이미 로그인 됨");
            navigate("/favorite");
        } else {
            openModal();
        }
    }

    return (
        <div className="header">
            <div className="header__left">
                <Logo />
                <div className="search">
                    <div className="search__input">
                        <input
                            className="search"
                            onChange={handleChange}
                            onKeyDown={handleChange}
                        />
                        <button></button>
                    </div>
                    <div className="search__button"></div>
                </div>
            </div>
            <div className="header__right">
                <div className="favorite">
                    <Link to="/favorite">
                        <div
                            className="favorite__button"
                            onClick={handleFavoriteClick}
                        >
                            <img src={favorite} className="favorite__icon" />
                            <span>MY</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
