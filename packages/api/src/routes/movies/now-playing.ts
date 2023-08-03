import type { Handler, Request, Response } from "express"
import type { TmdbService, UserService } from "../../services"

export const nowPlaying =
  ({
    tmdbService,
    userService,
  }: {
    tmdbService: TmdbService
    userService: UserService
  }): Handler =>
  (req: Request, res: Response) => {
    Promise.all([
      tmdbService.getNowPlayingMovies(),
      userService.getUserById(req.user!.id),
    ])
      .then(([movies, user]) => {
        if (!user) throw new Error("User not found")

        const { favorites } = user

        return res.json(
          movies.map((movie) => ({
            ...movie,
            isFavorite: Boolean(
              favorites.find((favorite) => favorite.movieId === movie.id),
            ),
          })),
        )
      })
      .catch((error: Error) => {
        console.error(error)
        return res.status(500).json({ error })
      })
  }
