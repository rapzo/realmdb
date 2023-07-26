import { Schema } from "mongoose"
import type { Document, Types } from "mongoose"
import type { FavoriteDocument } from "@realmdb/schemas"

export interface FavoriteSchema
  extends FavoriteDocument,
    Document<Types.ObjectId> {
  _id: Types.ObjectId
}

const FavoriteSchema = new Schema<FavoriteSchema>({
  movieId: {
    type: Number,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
})
