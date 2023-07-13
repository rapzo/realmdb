import { RequestHandler } from "express"
import type { UserSchema } from "../database/schemas/user"
import type { Model } from "mongoose"

export const signUp =
  ({ User }: Model<UserSchema>): RequestHandler =>
  async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Bad Request",
      })
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    })

    const token = await user.generateToken()

    return res.json({
      token,
    })
  }
