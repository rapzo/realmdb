import { pbkdf2 } from "crypto"
import { Schema } from "mongoose"
import type { Types } from "mongoose"

const { AUTH_SALT, AUTH_ITERATIONS, AUTH_HASH_LENGTH, AUTH_DIGEST } =
  process.env

if (!AUTH_SALT || !AUTH_ITERATIONS || !AUTH_HASH_LENGTH || !AUTH_DIGEST) {
  throw new Error("Bad environment configuration")
}

export interface UserSchema {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  avatar: string
  passwordhash: string
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
    },
    avatar: String,
    passwordhash: String,
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

user
  .virtual("password")
  .set(function (password: string) {
    pbkdf2(
      password,
      AUTH_SALT,
      Number(AUTH_ITERATIONS),
      Number(AUTH_HASH_LENGTH),
      AUTH_DIGEST,
      (err, derivedKey) => {
        if (err) throw err
        this.passwordhash = derivedKey.toString("hex")
      },
    )
  })
  .get(function () {
    return this.passwordhash
  })
