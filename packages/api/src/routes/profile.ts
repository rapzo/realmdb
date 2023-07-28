import type { Request, Response } from "express"
import type { UserService } from "../services"

export const createGetProfile =
  ({ userService }: { userService: UserService }) =>
  (req: Request, res: Response) => {
    const getUsers = async () => {
      const users = await userService
        .getUserById(req.user!.id)
        .select("-password -__v -createdAt -updatedAt -active")

      return res.json(users)
    }

    getUsers().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  }
