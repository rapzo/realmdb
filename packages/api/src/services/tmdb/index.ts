import { TmdbService } from "./tmdb-service"

export const createTmdbService = () => {
  return new TmdbService()
}
