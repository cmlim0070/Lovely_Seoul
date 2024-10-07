import favoriteemptyimg from "../../../assets/찜 목록 없음 아이콘.svg";

export default function FavoriteEmptyList() {
    return (
        <div className="emptylist">
            <img src={favoriteemptyimg}></img>
        </div>
    );
}
