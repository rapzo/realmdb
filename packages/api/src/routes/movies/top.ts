import type { Handler, Request, Response } from "express"
import type { TmdbService } from "../../services/tmdb/tmdb-service"

export const nowPlaying =
  ({ tmdbService }: { tmdbService: TmdbService }): Handler =>
  (_req: Request, res: Response) => {
    tmdbService
      .getNowPlayingMovies()
      .then((movies) => {
        return res.json(movies)
      })
      .catch((error: Error) => {
        console.error(error)
        return res.status(500).json({ error })
      })
  }
