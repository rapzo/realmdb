import type { Handler, Request, Response } from "express"
import type { TmdbService, UserService } from "../../services"
import type { Favorite, FavoritePayload } from "@realmdb/schemas"

interface FavoriteRequestPayload extends Request {
  body: FavoritePayload
}

export const getFavorites =
  ({ userService }: { userService: UserService }): Handler =>
  (req: Request, res: Response) => {
    const getFavorites = async () => {
      const { favorites } = (await userService
        .getUserById(req.user!.id)
        .select("favorites")) as { favorites: Favorite[] }

      return res.json(favorites)
    }

    return getFavorites().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
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

    if (!movieId) {
      return res.status(400).json({
        error: "Missing movieId",
      })
    }

    tmdbService
      .getMovie(Number(movieId))
      .then((movie) => {
        if (!movie) throw new Error("Movie not found")

        return userService.upsertFavorite(id, Number(movieId))
      })
      .then(({ favorites }) => {
        return res.json(favorites)
      })
      .catch((error: Error) => {
        console.error(error)

        res.status(500).json({
          error: `Cannot add movie ${movieId} to favorites`,
        })
      })
  }
