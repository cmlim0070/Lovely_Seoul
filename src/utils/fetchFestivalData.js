import ky from "ky";

// 장소별 문화행사 데이터를 가져옴
export const fetchFestivalData = async (placeName) => {
    const localURL = `http://openapi.seoul.go.kr:8088/${
        import.meta.env.VITE_SEOUL_API_KEY
    }/json/citydata/1/5/${placeName}`;
    const fesURL = `/api/fetchFestivalData?placeName=${placeName}`;
    const response = await ky.get(fesURL).json();
    console.log(placeName, " 문화행사 : ", response.CITYDATA.EVENT_STTS);
    return response.CITYDATA.EVENT_STTS;
};
