export default async function handler(req, res) {
    //장소 116곳 일괄 패치
    const url =
        "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true";

    try {
        const response = await fetch(url, { timeout: 10000 });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch place lists" });
    }
}
