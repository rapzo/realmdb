export interface FavoritePayload {
  movieId: number
}

export interface Favorite extends FavoritePayload {
  id: string
}

export interface FavoriteDocument extends FavoritePayload {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface FavoriteInput {
  movieId: number
}
