import type { Handler, Request, Response } from "express"
import type { TmdbService, UserService } from "../../services"
import { FavoritePayload } from "@realmdb/schemas"

interface FavoriteRequestPayload extends Request {
  body: FavoritePayload
}

export const upsertFavorite =
  ({
    tmdbService,
    userService,
  }: {
    tmdbService: TmdbService
    userService: UserService
  }): Handler =>
  (req: FavoriteRequestPayload, res: Response) => {
    const { movieId } = req.body
    const { id } = req.user || {}

    if (!id) {
      return res.status(401).json({
        error: "Unauthorized",
      })
    }

    tmdbService
      .getMovie(movieId)
      .then((movie) => {
        if (!movie) throw new Error("Movie not found")

        return userService.upsertFavorite(id, movieId)
      })
      .catch((error: Error) => {
        console.error(error)

        res.status(500).json({
          error: `Cannot add movie ${movieId} to favorites`,
        })
      })
  }
