import { type Favorite } from "./movies"

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

export type SignUpPayload = Omit<UserProfile, "id"> & {
  password: string
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
  favorites?: Favorite[]
}
