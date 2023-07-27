import type {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "../tmdb"

export interface Movie {
  backdrop: string
  budget: number
  genres: MovieGenre[]
  id: number
  imdbId?: string
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  poster?: string
  productionCompanies: MovieProductionCompany[]
  productionCountries: MovieProductionCountry[]
  releaseDate: string
  revenue: number
  runtime?: number
  spokenLanguages: MovieSpokenLanguage[]
  status: string
  tagline?: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
}

export type MovieGenre = Genre

export type MovieProductionCompany = ProductionCompany

export type MovieProductionCountry = ProductionCountry

export type MovieSpokenLanguage = SpokenLanguage
