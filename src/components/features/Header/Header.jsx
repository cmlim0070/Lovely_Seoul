import "./Header.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../components/common/Logo";
import favorite from "../../../assets/favorite.svg";
import useSearch from "../../../store/useSearch";
import useModal from "../../../store/useModal";
import useAuth from "../../../store/useAuth";

export default function Header() {
    const { setSearchTerm } = useSearch();
    const { openModal } = useModal();
    const { username, userage, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

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
