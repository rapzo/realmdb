import type { Request, Response } from "express"
import type { UserModel } from "../database"
import { createAuthentication } from "../middleware/authentication"

export const createSignIn = ({ User }: { User: UserModel }) => [
  createAuthentication({ User }),

  (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Invalid credentials",
      })
    }

    res.json({
      ...req.user,
    })
  },
]
