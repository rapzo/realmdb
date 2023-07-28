import { Router } from "express"
import { nowPlaying } from "./now-playing"
import { getFavorites, upsertFavorite } from "./favorites"
import type { TmdbService, UserService } from "../../services"

export const createMoviesRouter = ({
  tmdbService,
  userService,
}: {
  tmdbService: TmdbService
  userService: UserService
}): Router => {
  const router = Router()

  router.get("/playing", nowPlaying({ tmdbService }))
  router.get("/favorites", getFavorites({ userService }))
  router.post("/favorite", upsertFavorite({ tmdbService, userService }))

  return router
}
