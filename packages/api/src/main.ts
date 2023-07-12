import express from "express"
import helmet from "helmet"
import cors from "cors"
import { json } from "body-parser"
import { name } from "@realmdb/types"

import { connect } from "./database/connect"
import { UserSchema, user } from "./database/schemas/user"
import { createUsersRouter } from "./database/routes/users"

const { PORT = 3000, DATABASE_URL } = process.env

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined")

export const main = async (): Promise<void> => {
  const connection = await connect({
    url: DATABASE_URL,
    // username: "realmdbroot",
    // password: "realmdbrootpassword",
  })

  connection.model<UserSchema>("User", user)

  console.log(`Conecction to ${connection.name} established`)

  const app = express()

  app.use(cors())
  app.use(json())
  app.use(helmet())

  app.get("/hb", (_req, res) =>
    res.json({
      name,
      status: "ok",
    }),
  )

  app.use(
    "/users",
    createUsersRouter({ User: connection.model<UserSchema>("User") }),
  )

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}
