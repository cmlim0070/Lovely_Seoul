import { BounceLoader } from "react-spinners";
import useFes from "../../../store/useFes";
import FestivalCard from "./Card/FestivalCard";
import SearchEmptyList from "./SearchEmptyList";

export default function FestivalList() {
    const { fesDataList, isLoading } = useFes();

    return (
        <div className="listcon__contentwrap">
            {isLoading ? (
                <div className="spinner">
                    <BounceLoader color="#98e0ff" />
                </div>
            ) : fesDataList && fesDataList.length > 0 ? (
                fesDataList.map((value, index) => {
                    return (
                        <div key={index}>
                            <FestivalCard data={value} key={index} />
                        </div>
                    );
                })
            ) : (
                <SearchEmptyList />
            )}
        </div>
    );
}
