import favoriteemptyimg from "../../../assets/검색 결과 없음 아이콘.svg";

export default function FavoriteEmptyList() {
    return (
        <div className="emptylist">
            <img src={favoriteemptyimg}></img>
        </div>
    );
}
