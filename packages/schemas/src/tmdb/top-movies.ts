export interface TopMoviesResponse {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: Array<TopMovieResponse>
  total_pages: number
  total_results: number
}

export interface TopMovieResponse {
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

export interface TopMovie {
  id: number
  title: string
  overview: string
  poster: string
  backdrop: string
  popularity: number
  voteAverage: number
  voteCount: number
  releaseDate: string
}
