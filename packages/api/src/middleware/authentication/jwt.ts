import { use } from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import type { Model } from "mongoose"
import type { UserSchema } from "../../database/schemas/user"

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, JWT_MAX_AGE } = process.env

if (!JWT_SECRET || !JWT_ISSUER || !JWT_AUDIENCE || !JWT_MAX_AGE) {
  throw new Error("Bad environment configuration")
}

export const createJWT = ({ User }: { User: Model<UserSchema> }) => {
  const strategy = new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jsonWebTokenOptions: {
        maxAge: process.env.JWT_MAX_AGE,
      },
    },
    (payload, done) => {
      const checkUser = async () => {}

      checkUser().catch(done)
    },
  )

  return use(strategy)
}
