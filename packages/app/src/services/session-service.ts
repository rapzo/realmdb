import { type Http, http, removeCookieHeader } from "../providers/http"

export interface SignInResponse {
  email: string
  firstName: string
  lastName: string
}

export interface SignUpResponse {
  email: string
  firstName: string
  lastName: string
}

export class SessionService {
  constructor(private readonly http: Http) {}

  async signIn(email: string, password: string): Promise<SignInResponse> {
    removeCookieHeader()
    const response = await this.http.post<
      {
        email: string
        password: string
      },
      SignInResponse
    >("/signin", { email, password })

    return response
  }

  async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<SignUpResponse> {
    removeCookieHeader()
    const response = await this.http.post("/signup", {
      email,
      password,
      firstName,
      lastName,
    })

    const { data } = response

    return data
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
