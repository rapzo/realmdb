import {
  pbkdf2,
  // timingSafeEqual
} from "crypto"
import { Schema } from "mongoose"
import type { Model, Types } from "mongoose"
import type { UserProfile } from "@realmdb/schemas"
import { type FavoriteSchema, favoriteSchema } from "./favorite"

const { AUTH_SALT, AUTH_ITERATIONS, AUTH_HASH_LENGTH, AUTH_DIGEST } =
  process.env

if (!AUTH_SALT || !AUTH_ITERATIONS || !AUTH_HASH_LENGTH || !AUTH_DIGEST) {
  throw new Error("Bad environment configuration")
}

export interface UserSchema extends UserProfile {
  _id: Types.ObjectId
  favorites: FavoriteSchema[]
  password: string
  recoveryToken?: string
  recoveryTokenExpiresAt?: Date
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export type UserSchemaProps = {
  favorites: Types.DocumentArray<FavoriteSchema>

  comparePassword(password: string): Promise<boolean>
  generateToken(): Promise<string>

  isFavorite(movieId: number): boolean
  addFavorite(movieId: number): void
  removeFavorite(movieId: number): void
}

export type UserSchemaModel = Model<UserSchema, object, UserSchemaProps>

export const userSchema = new Schema<
  UserSchema,
  UserSchemaModel,
  UserSchemaProps
>(
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
      maxlength: 255,
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
  if (!this.isModified("email")) return true

  try {
    const users = await this.$model("User").find({ email })

    return users.length === 0
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

userSchema.methods.generateToken = function () {
  return Promise.resolve("token")
}

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  try {
    const hashedPassword = await createPasswordHash(password)
    return this.password === hashedPassword
  } catch (err) {
    return false
  }
}

userSchema.methods.addFavorite = function (movieId: number) {
  this.favorites.push({ movieId })
}

userSchema.methods.removeFavorite = function (movieId: number) {
  this.favorites.pull({ movieId })
}

userSchema.methods.isFavorite = function (movieId: number) {
  const [fav] = this.favorites.filter((fav) => fav.movieId === movieId)

  return !!fav
}
