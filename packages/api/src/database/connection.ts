import { connect } from "./connect"
import { UserModel, UserSchema, userSchema } from "./schemas/user"

import type { Connection } from "./connect"

export interface DataLayer {
  connection: Connection
  User: UserModel
}

export const createConnection = async (url: string): Promise<DataLayer> => {
  const connection = await connect(url)

  const User = connection.model<UserSchema, UserModel>("User", userSchema)

  return {
    connection,
    User,
  }
}
