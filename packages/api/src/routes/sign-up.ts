import type { Request, Response } from "express"
import type { UserModel } from "../database"

export interface SignUpRequest extends Request {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

export const createSignUp =
  ({ User }: { User: UserModel }) =>
  (req: SignUpRequest, res: Response) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Bad Request",
      })
    }

    const createUser = async () => {
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

    createUser().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  }
