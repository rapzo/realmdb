import { type Http, createHttpProvider } from "./http"
import type { Stream } from "stream"
import type {
  ConfigurationResponse,
  NowPlayingMovie,
  NowPlayingMovieResponse,
  NowPlayingMoviesResponse,
} from "@realmdb/schemas"
import type { AxiosResponse } from "axios"

const { TMDB_URL, TMDB_API_KEY, TMDB_READ_ACCESS_TOKEN } = process.env

export class TmdbService {
  private readonly http: Http

  constructor() {
    this.http = createHttpProvider({
      baseURL: TMDB_URL!,
      apiKey: TMDB_API_KEY!,
      apiReadAccessToken: TMDB_READ_ACCESS_TOKEN!,
    })
  }

  async getConfiguration() {
    const { data } = await this.http.get<ConfigurationResponse>(
      "/configuration",
    )

    return data
  }

  async getNowPlayingMovies(page = 1): Promise<NowPlayingMovie[]> {
    const { data } = await this.http.get<NowPlayingMoviesResponse>(
      "/movie/now_playing",
      {
        params: {
          page,
        },
      },
    )

    const { results } = data
    const movies = results
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path ? stripSlash(movie.poster_path) : "",
        backdrop: movie.backdrop_path ? stripSlash(movie.backdrop_path) : "",
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        releaseDate: movie.release_date,
      }))
      .sort((a, b) =>
        new Date(b.releaseDate) > new Date(a.releaseDate) ? 1 : -1,
      )

    return movies
  }

  async getImage(path: string): Promise<AxiosResponse<Stream>> {
    return this.http.get<Stream>(path, {
      responseType: "stream",
    })
  }
}

const stripSlash = (path: string) => path.replace(/^\//, "")
