import { UserModel } from "../database"

export interface CreateUserPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

export class UserService {
  constructor(private readonly User: UserModel) {}

  async createUser({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserPayload) {
    const user = await this.User.create({
      email,
      password,
      firstName,
      lastName,
    })

    return user
  }

  getUserByEmail(email: string) {
    return this.User.findOne({ email })
  }
}
