import passport from "passport"
import { Strategy } from "passport-local"
import type { UserModel } from "../../database"
import type { Handler, Request } from "express"

export interface SignUpRequest extends Request {
  body: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

const STRAGEY_NAME = "SIGN_UP"

export const createRegistration = ({ User }: { User: UserModel }): Handler => {
  const strategy = new Strategy(
    {
      session: false,
      passReqToCallback: true,
      usernameField: "email",
    },
    (req: SignUpRequest, username: string, password: string, done) => {
      const createUser = async () => {
        const { firstName, lastName } = req.body

        if (!username || !password || !firstName || !lastName) {
          return done(null, false, { message: "Missing required fields" })
        }

        const { email } = await User.create({
          email: username,
          password,
          firstName,
          lastName,
        })

        done(null, { email, firstName, lastName })
      }

      createUser().catch(done)
    },
  )

  passport.use(STRAGEY_NAME, strategy)

  return passport.authenticate(STRAGEY_NAME, { session: false }) as Handler
}
