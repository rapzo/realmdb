import { use } from "passport"
import { Strategy } from "passport-local"
import {
  createPasswordHash,
  type UserSchema,
} from "../../database/schemas/user"
import type { Model } from "mongoose"

export const createAuthentication = ({ User }: { User: Model<UserSchema> }) => {
  const strategy = new Strategy(
    {
      session: false,
    },
    (username, password, done) => {
      const checkUser = async () => {
        const user = await User.findOne({ email: username })

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        const hashedPassword = (await createPasswordHash(password)).toString(
          "hex",
        )

        if (hashedPassword !== user.password) {
          return done(null, false, { message: "Invalid password" })
        }

        return done(null, user)
      }

      checkUser().catch(done)
    },
  )

  return use(strategy)
}
