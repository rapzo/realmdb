import type { NextFunction, Request, Response } from "express"
import type { UserModel } from "../database"
import { createAuthentication } from "../middleware/authentication"

export interface SignInRequest extends Request {
  body: {
    email: string
    password: string
  }
}

export const createSignIn = ({ User }: { User: UserModel }) => {
  const authenticate = createAuthentication({ User })

  return (req: SignInRequest, res: Response, next: NextFunction) => {
    const handler = authenticate((error, user, _info) => {
      if (error) {
        return next(error)
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
        })
      }

      res.json({
        ...user,
      })
    })

    handler(req, res, next)
  }
}
