import { TmdbImagesService } from "./images-service"
import type { ConfigurationResponse, TopMoviesResponse } from "@realmdb/schemas"
import { type Http, createHttpProvider } from "./http"
import { AxiosResponse } from "axios"
import { Stream } from "stream"

const { TMDB_URL, TMDB_API_KEY, TMDB_READ_ACCESS_TOKEN } = process.env

export class TmdbService {
  private readonly http: Http

  private imagesService?: TmdbImagesService

  constructor() {
    this.http = createHttpProvider({
      baseURL: TMDB_URL!,
      apiKey: TMDB_API_KEY!,
      apiReadAccessToken: TMDB_READ_ACCESS_TOKEN!,
    })

    this.getConfiguration()
      .then(({ images }) => {
        this.imagesService = new TmdbImagesService(images)
      })
      .catch((error) => {
        console.error("Failed to get TMDB configuration")
        console.error(error)
      })
  }

  async getConfiguration() {
    const { data } = await this.http.get<ConfigurationResponse>(
      "/configuration",
    )

    return data
  }

  async getNowPlayingMovies(page = 1): Promise<TopMoviesResponse> {
    const { data } = await this.http.get<TopMoviesResponse>(
      "/movie/now_playing",
      {
        params: {
          page,
        },
      },
    )

    return data
  }

  async getImage(path: string): Promise<AxiosResponse<Stream>> {
    if (!this.imagesService) {
      throw new Error("Image service is not initialized")
    }

    return this.http.get<Stream>(this.imagesService.getPosterURL(path), {
      responseType: "stream",
    })
  }
}
