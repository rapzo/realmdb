import type { SignUpPayload } from "@realmdb/schemas"
import type { UserSchemaModel } from "../database"

export class UserService {
  constructor(private readonly User: UserSchemaModel) {}

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

    if (user.isFavorite(movieId)) {
      user.removeFavorite(movieId)
    } else {
      user.addFavorite(movieId)
    }

    return await user.save()
  }
}
