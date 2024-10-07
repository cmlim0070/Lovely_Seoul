export default async function handler(req, res) {
    const { placeName } = req.query;
    // 장소별 문화행사 포함 전체 데이터
    const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.VITE_SEOUL_API_KEY}/json/citydata/1/5/${placeName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch population data" });
    }
}
