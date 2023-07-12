import { createConnection } from "mongoose"
import type { Connection } from "mongoose"

export interface ConnectOptions {
  url: string
  username?: string
  password?: string
}

export function connect({
  url, // username,
} // password,
: ConnectOptions): Promise<Connection> {
  return createConnection(url, {
    // auth: {
    //   username,
    //   password,
    // },
    authSource: "admin",
  }).asPromise()
}
