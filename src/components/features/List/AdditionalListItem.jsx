import useMapCenter from "../../../store/useMapCenter";

export default function AdditionalListItem({ data }) {
    const { road_address_name, place_url, place_name, x, y } = data || {};

    const { setMapCenter } = useMapCenter();

    function handleClick() {
        console.log(x, y);
        setMapCenter({
            lat: y,
            lng: x,
        });
    }

    return (
        <div className="additionallistitem" onClick={handleClick}>
            <div className="additionallistitem__name">{place_name}</div>
        </div>
    );
}
