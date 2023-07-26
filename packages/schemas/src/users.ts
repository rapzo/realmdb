export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface User {
  id?: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}
