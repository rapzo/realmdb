import { pbkdf2 } from "crypto"
import { Schema } from "mongoose"
import type { Document, Types } from "mongoose"

const { AUTH_SALT, AUTH_ITERATIONS, AUTH_HASH_LENGTH, AUTH_DIGEST } =
  process.env

if (!AUTH_SALT || !AUTH_ITERATIONS || !AUTH_HASH_LENGTH || !AUTH_DIGEST) {
  throw new Error("Bad environment configuration")
}

export interface UserSchema extends Document<Types.ObjectId> {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
  recoveryToken?: string
  recoveryTokenExpiresAt?: Date
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export const user = new Schema<UserSchema>(
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

const createPasswordHash = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    pbkdf2(
      password,
      AUTH_SALT,
      Number(AUTH_ITERATIONS),
      Number(AUTH_HASH_LENGTH),
      AUTH_DIGEST,
      (err, derivedKey) => {
        if (err) return reject(err)
        resolve(derivedKey.toString("hex"))
      },
    )
  })

user.pre<UserSchema>("save", function (next) {
  if (this.isModified("password")) {
    return createPasswordHash(this.password)
      .then((hash) => {
        this.password = hash
        return next()
      })
      .catch(next)
  }
  next()
})