import type { RequestHandler } from "express"

export const isAuthenticated = (): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      })
    }

    return next()
  }
}
