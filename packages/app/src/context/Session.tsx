import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react"
import { Navigate, useLocation } from "react-router-dom"

import { session } from "../services/session-service"

export interface User {
  email: string
  firstName?: string
  lastName?: string
  profileUrl?: string
}

interface SessionContext {
  user: {
    email: string
    firstName?: string
    lastName?: string
    profileUrl?: string
  } | null

  // resendConfirmationCode: (username: string) => Promise<void>
  signIn: (username: string, password: string) => Promise<User>
  signOut: () => Promise<void>
}

function readFromLocalStorage() {
  try {
    const user = localStorage.getItem("user")

    if (user) return JSON.parse(user)

    return null
  } catch (error) {
    console.log("error reading from local storage", error)

    return null
  }
}

function writeToLocalStorage(user: User | null) {
  try {
    if (!user) {
      localStorage.removeItem("user")
    } else {
      localStorage.setItem("user", JSON.stringify(user))
    }
  } catch (error) {
    console.log("error writing to local storage", error)
  }
}

async function signIn(username: string, password: string) {
  try {
    const user = await session.signIn(username, password)

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
  const [user, setUser] = useState<{
    email: string
    firstName?: string
    lastName?: string
    profileUrl?: string
  } | null>(readFromLocalStorage())

  const value = {
    user,

    // resendConfirmationCode,

    async signIn(username: string, password: string) {
      const user = await signIn(username, password)

      setUser(user)

      writeToLocalStorage(user)

      return user
    },

    async signOut() {
      await signOut()

      setUser(null)

      writeToLocalStorage(null)
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
