import { FavoriteDocument } from "./movies"

export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  avatar?: string
  favorites?: FavoriteDocument[]
}

export interface SignInPayload {
  email: string
  password: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}
