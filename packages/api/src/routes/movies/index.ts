import { Router } from "express"

export const movies = () => {
  const router = Router()

  router.get("/top", (req, res) => {
    res.json({})
  })

  return router
}
