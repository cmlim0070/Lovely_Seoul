export default async function handler(req, res) {
    const { placeName } = req.query;
    //장소별 인구데이터
    const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.VITE_SEOUL_API_KEY}/json/citydata_ppltn/1/5/${placeName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        res.status(200).json(data["SeoulRtd.citydata_ppltn"][0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch population data" });
    }
}
