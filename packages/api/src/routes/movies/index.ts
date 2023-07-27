import { Router } from "express"
import { nowPlaying } from "./now-playing"
import { upsertFavorite } from "./upsert-favorite"
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
  router.post("/:id/favotire", () =>
    upsertFavorite({ tmdbService, userService }),
  )

  return router
}
