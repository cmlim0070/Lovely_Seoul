import { BounceLoader } from "react-spinners";
import useFes from "../../../store/useFes";
import FestivalCard from "./Card/FestivalCard";

export default function FestivalList() {
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
