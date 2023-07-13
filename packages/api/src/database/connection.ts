import { connect } from "./connect"
import { UserModel, UserSchema, user } from "./schemas/user"

import type { Connection } from "./connect"

export interface DataLayer {
  connection: Connection
  User: UserModel
}

export const createConnection = async (url: string): Promise<DataLayer> => {
  const connection = await connect(url)

  const User = connection.model<UserSchema>("User", user)

  return {
    connection,
    User,
  }
}
