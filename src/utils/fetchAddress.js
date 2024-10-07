export const fetchAddress = (geocoder, x, y) =>
    new Promise((resolve, reject) => {
        geocoder.coord2Address(y, x, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const address =
                    result[0].road_address?.address_name ||
                    result[0].address.address_name;
                resolve(address);
            } else {
                reject("주소 없음");
            }
        });
    });
