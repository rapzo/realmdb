import express from "express"
import helmet from "helmet"
import cors from "cors"

import { createConnection } from "./database"
import { createGetUsers } from "./routes/get-users"
import { createSignIn } from "./routes/sign-in"
import { createSignUp } from "./routes/sign-up"

const { PORT = 3000, DATABASE_URL } = process.env

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined")

export const main = async (): Promise<void> => {
  const { User } = await createConnection(DATABASE_URL)
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(helmet())

  app.get("/hb", (_req, res) =>
    res.json({
      name,
      status: "ok",
    }),
  )

  app.post("/sign-in", createSignIn({ User }))
  app.post("/sign-up", createSignUp({ User }))
  app.get("/users", createGetUsers({ User }))

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}
