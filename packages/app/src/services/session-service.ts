import { type User } from "@realmdb/schemas"
import { type Http, http, setAuthorizationHeader } from "../providers/Http"

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse extends User {
  token: string
}

export interface SignUpRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type SignUpResponse = User

export class SessionService {
  constructor(private readonly http: Http) {}

  async signIn(email: string, password: string): Promise<SignInResponse> {
    const response = await this.http.post<SignInRequest, SignInResponse>(
      "/signin",
      { email, password },
    )

    const { token } = response

    // Set the Authorization header for the http provider
    setAuthorizationHeader(token)

    return response
  }

  async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<SignUpResponse> {
    const response = await this.http.post<SignUpRequest, SignUpResponse>(
      "/signup",
      {
        email,
        password,
        firstName,
        lastName,
      },
    )

    return response
  }

  async signOut() {
    const response = await http.post("/signout")

    // Remove the  Authorization header from the http provider
    // removeAuthorizationHeader()

    const { data } = response

    return data
  }
}

export const session = new SessionService(http)
