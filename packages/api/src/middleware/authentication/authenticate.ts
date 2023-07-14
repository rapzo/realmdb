import passport from "passport"
import { Strategy } from "passport-local"
import { createPasswordHash, type UserModel } from "../../database"

const STRAGEY_NAME = "SIGN_IN"

export const createAuthentication =
  ({ User }: { User: UserModel }) =>
  () => {
    const strategy = new Strategy(
      {
        // session: false,
        passReqToCallback: true,
        usernameField: "email",
      },
      (req, username, password, done) => {
        const checkUser = async () => {
          const user = await User.findOne({
            email: username,
          })

          if (!user) {
            return done(null, false, { message: "User not found" })
          }

          const hashedPassword = await createPasswordHash(password)

          if (hashedPassword !== user.password) {
            return done(null, false, { message: "Invalid password" })
          }

          const { firstName, lastName, email } = user
          return done(null, { firstName, lastName, email })
        }

        checkUser().catch(done)
      },
    )

    passport.use(STRAGEY_NAME, strategy)

    return passport.authenticate.bind(passport, STRAGEY_NAME)
  }