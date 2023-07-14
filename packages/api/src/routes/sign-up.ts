import { createRegistration } from "../middleware/authentication"

import type { Handler, Request, Response } from "express"
import type { UserModel } from "../database"

export const createSignUp = ({ User }: { User: UserModel }): Handler[] => [
  createRegistration({ User }),
  ({ user }: Request, res: Response) => {
    res.json({
      user,
    })
  },
]
