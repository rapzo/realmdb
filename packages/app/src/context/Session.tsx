import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react"
import { Navigate, useLocation } from "react-router-dom"

import { session } from "../services/session-service"
import { setAuthorizationHeader } from "../providers/http"

export interface User {
  email: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

interface SessionContext {
  user: {
    email: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
  } | null

  // resendConfirmationCode: (username: string) => Promise<void>
  signIn: (username: string, password: string) => Promise<User>
  signOut: () => Promise<void>
}

function readFromLocalStorage() {
  try {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (user && token)
      return { user: JSON.parse(user), token: JSON.parse(token) }

    return null
  } catch (error) {
    console.log("error reading from local storage", error)

    return null
  }
}

function writeToLocalStorage(data: Record<string, unknown>) {
  try {
    const keys = Object.keys(data)

    if (keys.length === 0) return

    for (const key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]))
    }
  } catch (error) {
    console.log("error writing to local storage", error)
  }
}

function clearLocalStorage() {
  try {
    localStorage.clear()
  } catch (error) {
    console.log("error clearing local storage", error)
  }
}

async function signIn(username: string, password: string) {
  try {
    const { token, ...user } = await session.signIn(username, password)

    writeToLocalStorage({ user, token })
    setAuthorizationHeader(token)

    return user
  } catch (error) {
    console.log("error signing in", error)

    throw error
  }
}

// async function resendConfirmationCode(username: string) {
//   try {
//     await session.resendSignUp(username)
//     console.log("code resent successfully")
//   } catch (err) {
//     console.log("error resending code: ", err)
//   }
// }

async function signOut() {
  try {
    clearLocalStorage()
    await session.signOut()
  } catch (error) {
    console.log("error signing out: ", error)
  }
}

const sessionContext = createContext<SessionContext>({
  user: null,
  // resendConfirmationCode,
  signIn,
  signOut,
})
const { Provider } = sessionContext

export function useSession() {
  return useContext(sessionContext)
}

export function SessionProvider(props: PropsWithChildren<{}>) {
  const { user: data, token } = readFromLocalStorage() || {}
  const [user, setUser] = useState<{
    email: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
  } | null>(data)

  if (token) setAuthorizationHeader(token)

  const value = {
    user,

    // resendConfirmationCode,

    async signIn(username: string, password: string) {
      const user = await signIn(username, password)

      setUser(user)

      return user
    },

    async signOut() {
      await signOut()

      setUser(null)
    },
  }

  return <Provider value={value} {...props} />
}

export function RequireSession({ children }: { children: ReactNode }) {
  const { user } = useSession()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
