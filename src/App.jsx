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

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
