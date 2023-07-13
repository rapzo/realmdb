import { createConnection } from "mongoose"
import type { Connection } from "mongoose"

export const connect = async (url: string): Promise<Connection> => {
  const connection = await createConnection(url, {
    authSource: "admin",
  }).asPromise()

  console.log(`Conecction to ${connection.name} established`)

  return connection
}
