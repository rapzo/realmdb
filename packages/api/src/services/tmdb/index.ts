import { TmdbImagesService } from "./images-service"
import { TmdbService } from "./tmdb-service"

export interface TmdbServices {
  tmdbService: TmdbService
  tmdbImagesService: TmdbImagesService
}

export const createTmdbServices = async (): Promise<TmdbServices> => {
  const tmdbService = new TmdbService()

  const { images } = await tmdbService.getConfiguration()
  const tmdbImagesService = new TmdbImagesService(images)

  return {
    tmdbService,
    tmdbImagesService,
  }
}

export * from "./images-service"
export * from "./tmdb-service"
