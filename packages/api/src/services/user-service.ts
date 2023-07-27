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

  getUserById(id: string) {
    return this.User.findById(id)
  }

  async upsertFavorite(userId: string, movieId: number) {
    const user = await this.getUserById(userId)

    if (!user) throw new Error("User not found")

    return user.isFavorite(movieId)
      ? user.removeFavorite(movieId)
      : user.addFavorite(movieId)
  }
}
