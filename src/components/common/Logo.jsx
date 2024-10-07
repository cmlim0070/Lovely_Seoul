import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Logo.css";

export default function Logo() {
    const navigate = useNavigate();
    return (
        <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={() => {
                navigate("/");
            }}
        />
    );
}
