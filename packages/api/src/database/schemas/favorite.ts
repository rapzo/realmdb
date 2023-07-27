import { Schema } from "mongoose"
import type { Types } from "mongoose"
import type { FavoriteDocument } from "@realmdb/schemas"

export interface FavoriteSchema extends FavoriteDocument, Types.Subdocument {
  _id: Types.ObjectId
}

export const favoriteSchema = new Schema<FavoriteSchema>({
  movieId: {
    type: Number,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
})
