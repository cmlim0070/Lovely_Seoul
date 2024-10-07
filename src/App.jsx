import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import ListContainer from "./components/features/List/ListContainer";
import usePlaceData from "./hooks/usePlaceData";
import useFetch from "./hooks/useFetch";

const url =
    "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true";

function App() {
    const { data: placeLists, error, isLoading } = useFetch("placeLists", url);
    usePlaceData(placeLists);

    if (isLoading) return <div>로딩중</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />}>
                        <Route index element={<ListContainer type="place" />} />
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
    );
}

export default App;
