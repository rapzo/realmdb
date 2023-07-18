import type { Request, Response } from "express"

export const createSignIn = () => {
  return (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Invalid credentials",
      })
    }

    res.json({
      ...req.user,
    })
  }
}
