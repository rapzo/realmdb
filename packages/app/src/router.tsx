import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"
import { SignIn } from "./components/authentication/SignIn"
import { SignUp } from "./components/authentication/SignUp"
import { SessionProvider } from "./context/Session"

export const router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return (
        <SessionProvider>
          <App />
        </SessionProvider>
      )
    },
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
])
