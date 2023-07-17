import passport from "passport"
import { type Handler } from "express"

export const createSession = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser", user)
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    console.log("deserializeUser", user)

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  })

  return passport.authenticate("session") as Handler
}
