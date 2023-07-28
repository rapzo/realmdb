import { useQuery } from "react-query"
import { http } from "../providers/Http"
import type { NowPlayingMovie } from "@realmdb/schemas"

export function useNowPlayingMovies() {
  return useQuery<NowPlayingMovie[], Error>(
    "nowPlaying",
    async (): Promise<NowPlayingMovie[]> => {
      const response = await http.get<never, NowPlayingMovie[]>(
        "/movies/playing",
      )

      return response
    },
  )
}
