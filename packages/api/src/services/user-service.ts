import type { SignUpPayload } from "@realmdb/schemas"
import type { UserModel } from "../database"

export class UserService {
  constructor(private readonly User: UserModel) {}

  async createUser({ email, password, firstName, lastName }: SignUpPayload) {
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
