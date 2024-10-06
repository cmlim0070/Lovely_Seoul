import { useEffect, useState } from "react";
import PlaceCard from "./Card/PlaceCard";
import useAuth from "../../../store/useAuth";
import FavoriteEmptyList from "./FavoriteEmptyList";

export default function Favorite() {
    const [favoritePlaces, setFavoritePlaces] = useState([]);
    const { isLoggedIn, username } = useAuth();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        const user_name = username;
        const userFavorites = favorites[user_name] || [];

        setFavoritePlaces(userFavorites);
    }, []);

    return (
        <div className="listcon__contentwrap">
            {favoritePlaces.length > 0 ? (
                favoritePlaces.map((value, index) => (
                    <PlaceCard
                        key={index}
                        data={
                            value.populationData["SeoulRtd.citydata_ppltn"][0]
                        }
                        location={{
                            lat: value.area.x,
                            lng: value.area.y,
                        }}
                    />
                ))
            ) : (
                <FavoriteEmptyList />
            )}
        </div>
    );
}
