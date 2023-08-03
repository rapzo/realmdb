import { connect } from "./connect"
import {
  type UserSchema,
  type UserSchemaModel,
  userSchema,
} from "./schemas/user"

import type { Connection } from "./connect"

export interface DataLayer {
  connection: Connection
  User: UserSchemaModel
}

export const createConnection = async (url: string): Promise<DataLayer> => {
  const connection = await connect(url)

  const User = connection.model<UserSchema, UserSchemaModel>("User", userSchema)

  return {
    connection,
    User,
  }
}
