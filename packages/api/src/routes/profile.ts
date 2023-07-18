import type { Request, Response } from "express"
import type { UserModel } from "../database"
import { isAuthenticated } from "../middleware/authentication"

export const createGetProfile = ({ User }: { User: UserModel }) => [
  isAuthenticated(),
  (req: Request, res: Response) => {
    const getUsers = async () => {
      const users = await User.findOne({}).select("email firstName lastName")

      return res.json(users)
    }

    getUsers().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  },
]
