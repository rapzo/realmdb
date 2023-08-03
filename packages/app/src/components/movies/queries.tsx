import { useQuery } from "@tanstack/react-query"
import { http } from "../../providers/Http"
import type { NowPlayingMovie, Favorite } from "@realmdb/schemas"

export function useNowPlayingMovies() {
  return useQuery<NowPlayingMovie[], Error>(
    ["nowPlaying"],
    async (): Promise<NowPlayingMovie[]> => {
      const response = await http.get<never, NowPlayingMovie[]>(
        "/movies/playing",
      )

      return response
    },
  )
}

export const useNowPlayingMovie = (id: number) => {
  return useQuery<NowPlayingMovie, Error>(
    ["nowPlaying", id],
    async (): Promise<NowPlayingMovie> => {
      const response = await http.get<never, NowPlayingMovie>(
        `/movies/playing/${id}`,
      )

      return response
    },
  )
}

export function useFavorites() {
  return useQuery<Favorite[], Error>(
    ["favorites"],
    async (): Promise<Favorite[]> => {
      const response = await http.get<never, Favorite[]>("/movies/favorites")

      return response
    },
  )
}
