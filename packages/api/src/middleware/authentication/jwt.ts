import passport, { type AuthenticateOptions } from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import jwt, {
  type Algorithm,
  type JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken"
import type { Handler } from "express"
import type { UserModel } from "../../database"
import type { User } from "@realmdb/schemas"

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

        const user = await User.findById(sub).select("email firstName lastName")

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        const { _id, email, firstName, lastName } = user
        return done(null, { id: _id, firstName, lastName, email })
      }

      checkUser().catch(done)
    },
  )

  passport.use(STRAGEY_NAME, strategy)
}

type isAuthenticatedMiddleware = (options?: AuthenticateOptions) => Handler
export const isAuthenticated: isAuthenticatedMiddleware = (
  options = { session: false },
) => {
  return (req, res, next) => {
    const verifyHandler = (
      error: Error,
      user?: User | null,
      info?: Error | null,
      _status?: number | null,
    ) => {
      if (error) return next(error)

      if (!user) {
        if (info instanceof Error) {
          if (info instanceof TokenExpiredError) {
            return res.status(401).json({
              message: "Unauthorized",
              error: "Token expired",
            })
          }

          return res.status(401).json({
            message: "Unauthorized",
            error: info.message,
          })
        }

        return res.status(401).json({
          message: "Unauthorized",
        })
      }

      req.user = user

      return next()
    }

    const handler = passport.authenticate(
      STRAGEY_NAME,
      options,
      verifyHandler,
    ) as Handler

    return handler(req, res, next)
  }
}

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
