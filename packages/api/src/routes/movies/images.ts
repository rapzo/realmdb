import type { Request, Response } from "express"
import type { TmdbService } from "../../services/tmdb/tmdb-service"

interface ImageRequest extends Request {
  params: {
    path: string
  }
}

export const image =
  ({ tmdbService }: { tmdbService: TmdbService }) =>
  (req: ImageRequest, res: Response) => {
    const { path } = req.params

    tmdbService
      .getImage(path)
      .then(({ data }) => data.pipe(res))
      .catch((error: Error) => {
        console.error(error)
        return res.status(404).send()
      })
  }
