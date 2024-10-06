import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";
import useFocus from "../../../store/useFocus";
import useFes from "../../../store/useFes";
import FestivalCard from "./Card/FestivalCard";
import { BounceLoader } from "react-spinners";

export default function FestivalList() {
    // const { focusedPlace, setFocusedPlace } = useFocus();
    const { fesDataList } = useFes();

    return (
        <div className="listcon__contentwrap">
            {fesDataList && fesDataList.length > 0 ? (
                fesDataList.map((value, index) => {
                    return (
                        <div key={index}>
                            <FestivalCard data={value} key={index} />
                        </div>
                    );
                })
            ) : (
                <div className="spinner">
                    <BounceLoader color="#98e0ff" />
                </div>
            )}
        </div>
    );
}
