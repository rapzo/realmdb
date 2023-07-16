import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import { Navigate, useLocation } from "react-router-dom"

interface SessionContext {
  user: {
    email: string
    firstName?: string
    lastName?: string
    profileUrl?: string
  }

  resendConfirmationCode: (username: string) => Promise<void>
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

async function signIn(username: string, password: string) {
  try {
    const user = await Auth.signIn(username, password)

    return user
  } catch (error) {
    console.log("error signing in", error)
  }
}

async function resendConfirmationCode(username: string) {
  try {
    await Auth.resendSignUp(username)
    console.log("code resent successfully")
  } catch (err) {
    console.log("error resending code: ", err)
  }
}

async function signOut() {
  try {
    await Auth.signOut()
  } catch (error) {
    console.log("error signing out: ", error)
  }
}

const sessionContext = createContext<SessionContext>({
  user: {
    email: "",
    username: "",
  },
  resendConfirmationCode,
  signIn,
  signOut,
})
const { Provider } = sessionContext

export function useSession() {
  return useContext(sessionContext)
}

export function SessionProvider(props: PropsWithChildren<{}>) {
  const [user, setUser] = useState<{
    username: string
    email: string
  }>({
    username: "",
    email: "",
  })

  const value = useMemo<SessionContext>(
    () => ({
      user,

      resendConfirmationCode,

      signIn: async (username, password) => {
        const user = await signIn(username, password)
        setUser(user)
      },

      signOut: async () => {
        await signOut()
        setUser({
          username: "",
          email: "",
        })
      },
    }),
    [resendConfirmationCode, signIn, signOut],
  )

  return <Provider value={value} {...props} />
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useSession()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} />
  }

  return children
}
