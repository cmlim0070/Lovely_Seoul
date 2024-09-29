import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";
import "./Layout.css";

export default function Layout() {
    return (
        <>
            <Header></Header>
            <section>
                <Outlet />
            </section>
        </>
    );
}
