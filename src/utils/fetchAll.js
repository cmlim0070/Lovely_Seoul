import { fetchAddress } from "./fetchAddress";
import { fetchPlacePopulationData } from "./fetchPlacePopulationData";

// 장소 데이터에 주소와 인구 데이터 묶음을 추가해서 가공
export const fetchAll = async (placeLists, geocoder) => {
    return await Promise.all(
        placeLists.row.map(async (place) => ({
            ...place,
            address: await fetchAddress(geocoder, place.x, place.y),
            population: await fetchPlacePopulationData(place.area_nm),
        }))
    );
};
