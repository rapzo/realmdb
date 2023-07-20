import { Router } from "express"
import { nowPlaying } from "./top"
import { createTmdbService } from "../../services"
import { image } from "./images"

export const createMoviesRouter = (): Router => {
  const router = Router()

  const tmdbService = createTmdbService()

  router.get("/playing", nowPlaying({ tmdbService }))
  router.get("/images/:path", image({ tmdbService }))

  return router
}
