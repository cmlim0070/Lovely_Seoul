import ky from "ky";

// 장소별 인구 데이터 묶음을 가져옴
export const fetchPlacePopulationData = async (placeName) => {
    const localURL = `http://openapi.seoul.go.kr:8088/${
        import.meta.env.VITE_SEOUL_API_KEY
    }/json/citydata_ppltn/1/5/${placeName}`;
    const url = `/api/fetchPlacePopulationData?placeName=${placeName}`;
    try {
        const result = await ky.get(url).json();
        return result;
        // return result["SeoulRtd.citydata_ppltn"][0];
    } catch (error) {
        console.error("Error fetching population data:", error);
        throw new Error(
            "Failed to fetch population data. Please try again later."
        );
    }
};
