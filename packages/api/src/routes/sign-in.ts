import { RequestHandler } from "express"
import type { UserSchema } from "../database/schemas/user"
import type { Model } from "mongoose"

export const signIn =
  ({ User }: Model<UserSchema>): RequestHandler =>
  async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: "Bad Request",
      })
    }

    const user = await User.findOne({ email }).exec()

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
      })
    }

    const token = await user.generateToken()

    return res.json({
      token,
    })
  }
