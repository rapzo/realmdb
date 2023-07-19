import { TmdbService } from "./tmdb"

export const createTmdbService = () => {
  return new TmdbService()
}
