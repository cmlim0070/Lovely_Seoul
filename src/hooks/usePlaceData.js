import useAllData from "../store/useAllData";
import { useEffect } from "react";
import { fetchAll } from "../utils/fetchAll";

// 가장 인기있는 나잇대 정보 추가해서 전체 데이터 세팅
export default function usePlaceData(placeLists) {
    const { AllData, setAllData } = useAllData();
    useEffect(() => {
        try {
            if (placeLists && placeLists.row) {
                const geocoder = new window.kakao.maps.services.Geocoder();
                fetchAll(placeLists, geocoder).then((listdata) => {
                    if (listdata) {
                        const updatedData = listdata.map((data) => {
                            const population = data.population;
                            const ageData = [
                                {
                                    age: "10대",
                                    rate: Number(population.PPLTN_RATE_10) || 0,
                                },
                                {
                                    age: "20대",
                                    rate: Number(population.PPLTN_RATE_20) || 0,
                                },
                                {
                                    age: "30대",
                                    rate: Number(population.PPLTN_RATE_30) || 0,
                                },
                                {
                                    age: "40대",
                                    rate: Number(population.PPLTN_RATE_40) || 0,
                                },
                                {
                                    age: "50대",
                                    rate: Number(population.PPLTN_RATE_50) || 0,
                                },
                                {
                                    age: "60대",
                                    rate: Number(population.PPLTN_RATE_60) || 0,
                                },
                            ];
                            const mostPopularAge = ageData.reduce(
                                (max, current) =>
                                    current.rate > max.rate ? current : max
                            );
                            return {
                                ...data,
                                mostPopularAge: mostPopularAge.age,
                            };
                        });
                        setAllData(updatedData);
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }, [placeLists, setAllData]);
}
