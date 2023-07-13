import express from "express"
import helmet from "helmet"
import cors from "cors"
import { name } from "@realmdb/interfaces"

import { connect } from "./database/connect"
import { UserSchema, user } from "./database/schemas/user"
import { createUsersRouter } from "./routes/users"

const { PORT = 3000, DATABASE_URL } = process.env

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined")

export const main = async (): Promise<void> => {
  const connection = await connect(DATABASE_URL)
  const app = express()

  connection.model<UserSchema>("User", user)

  app.use(cors())
  app.use(express.json())
  app.use(helmet())

  app.get("/hb", (_req, res) =>
    res.json({
      name,
      status: "ok",
    }),
  )

  app.use(
    "/signin",
    createUsersRouter({ User: connection.model<UserSchema>("User") }),
  )

  app.use(
    "/users",
    createUsersRouter({ User: connection.model<UserSchema>("User") }),
  )

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}
