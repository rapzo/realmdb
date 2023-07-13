import { Router } from "express"
import { Model } from "mongoose"
import type { UserSchema } from "../database/schemas/user"

export const createUsersRouter = ({
  User,
}: {
  User: Model<UserSchema>
}): Router => {
  const router = Router()

  router.get("/", (req, res) => {
    const getUsers = async () => {
      const users = await User.find().select("email firstName lastName")

      return res.json(users)
    }

    getUsers().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  })

  router.post("/", (req, res) => {
    const createUser = async () => {
      const user = await User.create(req.body)
      const { _id, email, firstName, lastName } = user

      return res.json({
        id: _id,
        email,
        firstName,
        lastName,
      })
    }

    createUser().catch((error: Error) => {
      console.error(error)
      return res.status(500).json({
        error: error.message,
      })
    })
  })

  return router
}
