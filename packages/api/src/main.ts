import express from "express"
import helmet from "helmet"
import cors from "cors"

import { createConnection } from "./database"
import { createGetUsers } from "./routes/get-users"
import { createSignIn } from "./routes/sign-in"
import { createSignUp } from "./routes/sign-up"
import { createGetProfile } from "./routes/profile"
import { createAuthentication, createJWT } from "./middleware/authentication"

const { PORT = 3000, DATABASE_URL, CLIENT_URL } = process.env

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined")

export const main = async (): Promise<void> => {
  const { User } = await createConnection(DATABASE_URL)
  const app = express()

  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    }),
  )
  app.use(express.json())
  app.use(helmet())

  const authentication = createAuthentication({ User })
  const isAuthenticated = createJWT({ User })

  app.get("/hb", (_req, res) => res.json({ status: "ok" }))

  app.post("/signin", authentication, createSignIn())
  app.post("/signup", createSignUp({ User }))
  app.get("/profile", isAuthenticated, createGetProfile({ User }))
  app.get("/users", createGetUsers({ User }))

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}
