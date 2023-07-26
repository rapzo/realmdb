import { Router } from "express"
import { nowPlaying } from "./now-playing"
import type { TmdbService } from "../../services/tmdb"
import { UserService } from "../../services"

export const createMoviesRouter = ({
  tmdbService,
  userService,
}: {
  tmdbService: TmdbService
  userService: UserService
}): Router => {
  const router = Router()

  router.get("/playing", nowPlaying({ tmdbService }))
  router.patch("/:id/favotire", () => addFavorite({ tmdbService, userService }))
  router.delete("/:id/favotire", () => removeFavorite({ userService }))

  return router
}
