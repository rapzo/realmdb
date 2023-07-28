import { useQuery } from "react-query"
import { http } from "../providers/Http"
import type { Favorite } from "@realmdb/schemas"

export function useFavorites() {
  return useQuery<Favorite[], Error>(
    "favorites",
    async (): Promise<Favorite[]> => {
      const response = await http.get<never, Favorite[]>("/movies/favorites")

      return response
    },
  )
}
