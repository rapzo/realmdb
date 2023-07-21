import { Router } from "express"
import { nowPlaying } from "./top"
import type { TmdbService } from "../../services/tmdb"

export const createMoviesRouter = ({
  tmdbService,
}: {
  tmdbService: TmdbService
}): Router => {
  const router = Router()

  router.get("/playing", nowPlaying({ tmdbService }))

  return router
}
