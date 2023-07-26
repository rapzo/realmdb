import type { Handler, Request, Response } from "express"
import type { TmdbService, UserService } from "../../services"

export const addFavorite =
  ({
    tmdbService,
    userService,
  }: {
    tmdbService: TmdbService
    userService: UserService
  }): Handler =>
  (_req: Request, _res: Response) => {}
