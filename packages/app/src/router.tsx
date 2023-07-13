import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"
import { SignIn } from "./components/authentication/SignIn"
import { SignUp } from "./components/authentication/SignUp"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
