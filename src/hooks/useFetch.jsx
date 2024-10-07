import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export default function useFetch(dataLabel, url) {
    const result = useQuery({
        queryKey: [dataLabel],
        queryFn: async () => {
            try {
                const response = await ky.get(url).json();
                return response;
            } catch (err) {
                console.error("Fetch error: ", err);
                throw err;
            }
        },
    });

    return result;
}
