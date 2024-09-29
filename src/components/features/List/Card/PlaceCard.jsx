import "./Card.css";
// 장소 리스트 카드
export default function PlaceCard({ data }) {
    const {
        AREA_NM,
        AREA_CONGEST_MSG,
        FEMALE_PPLTN_RATE,
        MALE_PPLTN_RATE,
        AREA_CONGEST_LVL,
    } = data || {};

    //이미지 데이터 패치
    const ingURL = `https://data.seoul.go.kr/SeoulRtd/images/hotspot/${AREA_NM}.jpg`;

    return (
        <div className="placecard">
            <div className="placecard__wrap">
                <div className="placecard__imgwrap">
                    <img src={ingURL} className="placecard__img"></img>
                </div>
                <div className="placecard__content">
                    <div className="placecard__title">{AREA_NM}</div>
                    <div className="placecard__location">주소</div>
                    <span className="placecard__desc">{AREA_CONGEST_MSG}</span>
                    <div className="placecard__gender">
                        <div className="placecard__gender-female">
                            {FEMALE_PPLTN_RATE}
                        </div>
                        <div className="placecard__gender-male">
                            {MALE_PPLTN_RATE}
                        </div>
                    </div>
                    <div className="content__label">
                        {/* 추후 클래스명 따로 매핑해주고 CSS 수정해야함*/}
                        <div
                            className={`content__label-congest ${AREA_CONGEST_LVL}`}
                        >
                            {AREA_CONGEST_LVL}
                        </div>
                    </div>
                    {/* content__detail 하단은 상세보기 클릭하면 보이도록 처리 */}
                    <div className="content__detail"></div>
                </div>
            </div>
        </div>
    );
}
