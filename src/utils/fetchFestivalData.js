import ky from "ky";

// 장소별 문화행사 데이터를 가져옴
export const fetchFestivalData = async (placeName) => {
    const url = `/api/fetchFestivalData?placeName=${placeName}`;
    const result = await ky.get(url).json();
    return result;
};
