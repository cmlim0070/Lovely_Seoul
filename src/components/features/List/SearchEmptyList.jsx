import searchEmptyimg from "../../../assets/검색 결과 없음 아이콘.svg";

export default function SearchEmptyList() {
    return (
        <div className="emptylist">
            <img src={searchEmptyimg}></img>
        </div>
    );
}
