import type { Request, Response } from "express"
import type { UserModel } from "../database"

export interface SignInRequest extends Request {
  body: {
    email: string
    password: string
  }
}

export const createSignIn =
  ({ User }: { User: UserModel }) =>
  (req: SignInRequest, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: "Bad Request",
      })
    }

    const signIn = async () => {
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

    signIn().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  }
