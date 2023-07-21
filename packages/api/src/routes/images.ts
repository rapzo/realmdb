import type { Request, Response } from "express"
import type { TmdbService } from "../services/tmdb/tmdb-service"
import { TmdbImagesService } from "../services"

interface ImageRequest extends Request {
  params: {
    type: string
    name: string
    size: string
  }
}

export const createImagesRoute =
  ({
    tmdbService,
    tmdbImagesService,
  }: {
    tmdbService: TmdbService
    tmdbImagesService: TmdbImagesService
  }) =>
  (req: ImageRequest, res: Response) => {
    const { type, name, size } = req.params

    tmdbService
      .getImage(tmdbImagesService.getImageUrl(type, size, name))
      .then(({ headers, data }) => {
        res.set(headers)
        return data.pipe(res)
      })
      .catch((error: Error) => {
        console.error(error)
        return res.status(404).send()
      })
  }
