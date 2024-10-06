import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";
import "./Layout.css";
import LoginModal from "../common/Login/LoginModal";

export default function Layout() {
    return (
        <>
            <LoginModal />
            <Header></Header>
            <section>
                <Outlet />
            </section>
        </>
    );
}
