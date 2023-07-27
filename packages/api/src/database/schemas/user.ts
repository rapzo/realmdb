import {
  pbkdf2,
  // timingSafeEqual
} from "crypto"
import { Schema } from "mongoose"
import type { Model, Types, Document } from "mongoose"
import type { UserProfile } from "@realmdb/schemas"
import { FavoriteSchema, favoriteSchema } from "./favorite"

const { AUTH_SALT, AUTH_ITERATIONS, AUTH_HASH_LENGTH, AUTH_DIGEST } =
  process.env

if (!AUTH_SALT || !AUTH_ITERATIONS || !AUTH_HASH_LENGTH || !AUTH_DIGEST) {
  throw new Error("Bad environment configuration")
}

export interface UserDocument extends UserProfile {
  _id: Types.ObjectId
  password: string
  favorites: FavoriteSchema[]
  recoveryToken?: string
  recoveryTokenExpiresAt?: Date
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

type UserModelProps = {
  favorites: Types.DocumentArray<FavoriteSchema>

  comparePassword: (password: string) => Promise<boolean>
  generateToken: () => Promise<string>

  isFavorite: (movieId: number) => boolean
  addFavorite: (movieId: number) => Promise<UserSchema>
  removeFavorite: (movieId: number) => Promise<UserSchema>
}

export type UserModel = Model<UserDocument, unknown, UserModelProps>

export type UserSchema = UserDocument & UserModelProps & Document

export const userSchema = new Schema<UserDocument, UserModel, UserModelProps>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      indexes: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
    },
    avatar: String,
    favorites: [favoriteSchema],
    recoveryToken: String,
    recoveryTokenExpiresAt: Date,
    active: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
)

export const createPassword = (password: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    pbkdf2(
      password,
      AUTH_SALT,
      Number(AUTH_ITERATIONS),
      Number(AUTH_HASH_LENGTH),
      AUTH_DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err)
        resolve(derivedKey)
      },
    )
  })

export const createPasswordHash = async (password: string): Promise<string> =>
  (await createPassword(password)).toString("hex")

userSchema.path("email").validate(async function (email: string) {
  try {
    const count: number = await this.$model("User")
      .find({ email })
      .estimatedDocumentCount()
    return !count
  } catch (err) {
    return false
  }
}, "Email already exists")

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    return createPasswordHash(this.password)
      .then((password: string) => {
        this.password = password

        return next()
      })
      .catch(next)
  }
  next()
})

// @TODO use this method to compare passwords
// user.methods.comparePassword = function (password: string): Promise<boolean> {
//   return createPasswordHash(password).then((digest) => timingSafeEqual(this.password, digest))
// }

userSchema.method("generateToken", function (): Promise<string> {
  return Promise.resolve("token")
})

userSchema.method<UserSchema>(
  "comparePassword",
  async function (password: string): Promise<boolean> {
    try {
      const hashedPassword = await createPasswordHash(password)
      return this.password === hashedPassword
    } catch (err) {
      return false
    }
  },
)

userSchema.method<UserSchema>("addFavorite", function (movieId: number) {
  this.favorites.create({ movieId })

  return this.save()
})

userSchema.method<UserSchema>("removeFavorite", function (movieId: number) {
  this.favorites.pull({ movieId })

  return this.save()
})

userSchema.method<UserSchema>("isFavorite", function (movieId: number) {
  const [fav] = this.favorites.filter((fav) => fav.movieId === movieId) as [
    FavoriteSchema,
  ]

  return !!fav
})
