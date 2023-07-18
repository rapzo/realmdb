import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import jwt, { Algorithm, JwtPayload } from "jsonwebtoken"
import type { Handler } from "express"
import type { UserModel } from "../../database"

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, JWT_ALGORITHM, JWT_MAX_AGE } =
  process.env

if (
  !JWT_SECRET ||
  !JWT_ISSUER ||
  !JWT_AUDIENCE ||
  !JWT_ALGORITHM ||
  !JWT_MAX_AGE
) {
  throw new Error("Bad environment configuration")
}

const STRAGEY_NAME = "JWT"

export const createJWT = ({ User }: { User: UserModel }) => {
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
    (payload: JwtPayload, done) => {
      console.log("payload", JSON.stringify(payload, null, 2))

      const checkUser = async () => {
        const { sub } = payload

        if (!sub) {
          return done(null, false, { message: "User not found" })
        }

        const user = await User.findOne().select("email firstName lastName")

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        const { email, firstName, lastName } = user
        return done(null, { firstName, lastName, email })
      }

      checkUser().catch(done)
    },
  )

  passport.use(STRAGEY_NAME, strategy)

  return passport.authenticate(STRAGEY_NAME, { session: false }) as Handler
}

export const isAuthenticated = () =>
  passport.authenticate(STRAGEY_NAME, {
    session: false,
  }) as Handler

export const createToken = (subject: string, payload = {}) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    algorithm: JWT_ALGORITHM as Algorithm,
    subject,
  })

  return token
}
