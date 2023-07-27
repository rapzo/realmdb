import type { User as ApplicationUser } from "@realmdb/schemas"

declare global {
  namespace Express {
    export interface Request {
      user?: ApplicationUser
    }
  }
}
