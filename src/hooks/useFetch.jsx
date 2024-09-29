import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export default function useFetch(dataLabel, url) {
    // const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: [dataLabel],
        queryFn: async () => {
            const response = await ky.get(url).json();
            return response;
        },
    });

    return result;
}
