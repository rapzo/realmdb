import { Schema } from "mongoose"
import type { Document, Model, Types } from "mongoose"

export interface TopMovieSchema extends Document<Types.ObjectId> {
  _id: Types.ObjectId

  adult: boolean
  backdropPath: string
  genreIds: Array<number>
  tmdbId: number
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string
  releaseDate: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export type TopMovieModel = Model<TopMovieSchema>

export const topMovieSchema = new Schema<TopMovieSchema>({
  adult: {
    type: Boolean,
    required: true,
  },
  backdropPath: {
    type: String,
    required: true,
  },
  genreIds: {
    type: [Number],
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true,
    indexes: true,
  },
  originalLanguage: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video: {
    type: Boolean,
    required: true,
  },
  voteAverage: {
    type: Number,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
})
