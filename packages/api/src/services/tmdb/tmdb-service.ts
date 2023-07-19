import axios, { type AxiosInstance } from "axios"

export type Http = AxiosInstance

export interface TopMoviesResponse {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: Array<TopMovie>
  total_pages: number
  total_results: number
}

export interface TopMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const { TMDB_URL, TMDB_API_KEY, TMDB_READ_ACCESS_TOKEN } = process.env

export class TmdbService {
  private readonly http: Http = axios.create({
    baseURL: TMDB_URL,

    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    },

    params: {
      api_key: TMDB_API_KEY,
    },
  })

  constructor(private readonly Movie: MovieModel) {}

  async getTopMovies(page = 1): Promise<TopMoviesResponse> {
    const { data } = await this.http.get<TopMoviesResponse>("/movies/top", {
      params: {
        page,
      },
    })

    return data
  }
}
