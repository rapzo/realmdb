import { useMutation, useQueryClient } from "@tanstack/react-query"
import { http } from "../../providers/Http"
import { NowPlayingMovie } from "@realmdb/schemas"

export function useUpsertFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      movieId,
    }: {
      movieId: number
      isFavorite: boolean
    }) => {
      const response = await http.post("/movies/favorite", { movieId })

      return response
    },

    async onSuccess(_, { movieId, isFavorite }) {
      queryClient.setQueryData(["nowPlaying"], (data?: NowPlayingMovie[]) => {
        return data?.map((movie: NowPlayingMovie) => {
          if (movie.id === movieId) {
            return { ...movie, isFavorite }
          }

          return movie
        })
      })

      // await queryClient.invalidateQueries(["nowPlaying"])
    },
  })
}
