import passport from "passport"
import { Strategy } from "passport-local"
import { createPasswordHash, type UserModel } from "../../database"
import { createToken } from "./jwt"
import type { Handler, Request } from "express"

export interface SignInRequest extends Request {
  body: {
    email: string
    password: string
  }
}

const STRAGEY_NAME = "SIGN_IN"

export const createAuthentication = ({ User }: { User: UserModel }) => {
  const strategy = new Strategy(
    {
      session: false,
      usernameField: "email",
    },
    (email: string, password: string, done) => {
      const checkUser = async () => {
        const user = await User.findOne({
          email,
        })

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        const hashedPassword = await createPasswordHash(password)

        if (hashedPassword !== user.password) {
          return done(null, false, { message: "Invalid password" })
        }

        const token = createToken(user._id.toString())

        const { firstName, lastName } = user
        return done(null, { firstName, lastName, email, token })
      }

      checkUser().catch(done)
    },
  )

  passport.use(STRAGEY_NAME, strategy)

  return passport.authenticate(STRAGEY_NAME, { session: false }) as Handler
}
