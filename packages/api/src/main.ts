import express from "express"
import helmet from "helmet"
import cors from "cors"
import session from "express-session"

import { createConnection } from "./database"
import { createGetUsers } from "./routes/get-users"
import { createSignIn } from "./routes/sign-in"
import { createSignUp } from "./routes/sign-up"

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
  app.use(
    session({
      secret: "secret",
      // cookie: {
      //   secure: true,
      // },
      resave: false,
      saveUninitialized: true,
    }),
  )

  app.get("/hb", (_req, res) =>
    res.json({
      name,
      status: "ok",
    }),
  )

  app.post("/signin", createSignIn({ User }))
  app.post("/signup", createSignUp({ User }))
  app.get("/users", createGetUsers({ User }))

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}
