import type { Handler, Request, Response } from "express"
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
  ({ User }: { User: UserModel }): Handler =>
  (req: SignUpRequest, res: Response) => {
    const createUser = async () => {
      const { email, password, firstName, lastName } = req.body

      // TODO: Validate email, password, firstName, lastName
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          error: "Missing required fields",
        })
      }

      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
      })

      return res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }

    createUser().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  }
