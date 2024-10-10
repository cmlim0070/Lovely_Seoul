import AdditionalListItem from "./AdditionalListItem";

export default function AdditionalList({ dataList }) {
    return (
        <div className="additionallist">
            <div className="additionallist__title">
                이런 장소들 주변의 정보를 찾고 계신가요?
            </div>
            <div className="additionallist__content">
                {dataList.map((value, index) => {
                    return <AdditionalListItem key={index} data={value} />;
                })}
            </div>
        </div>
    );
}
