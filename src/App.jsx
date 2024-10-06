import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import FestivalList from "./components/features/List/FestivalList";
import ListContainer from "./components/features/List/ListContainer";
import LoginModal from "./components/common/Login/LoginModal";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />}>
                            <Route
                                index
                                element={<ListContainer type="place" />}
                            />
                            <Route
                                path="festivals"
                                element={<ListContainer type="festival" />}
                            />
                            <Route
                                path="favorite"
                                element={<ListContainer type="favorite" />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
