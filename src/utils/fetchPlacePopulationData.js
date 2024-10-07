import ky from "ky";

// 장소별 인구 데이터 묶음을 가져옴
export const fetchPlacePopulationData = async (placeName) => {
    const url = `/api/fetchPlacePopulationData?placeName=${placeName}`;
    try {
        const result = await ky
            .get(url, {
                timeout: 100000,
            })
            .json();
        return result;
    } catch (error) {
        console.error("Error fetching population data:", error);
        throw new Error(
            "Failed to fetch population data. Please try again later."
        );
    }
};
