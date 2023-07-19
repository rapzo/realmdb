import { Navigate, Route, Routes } from "react-router-dom"
import { RequireSession, SessionProvider, useSession } from "./context/Session"
import { SignUp } from "./components/authentication/SignUp"
import { SignIn } from "./components/authentication/SignIn"
import { Layout } from "./components/layout/Layout"
import { Profile } from "./components/profile/Profile"
import { NowPlaying } from "./components/movies/NowPlaying"

export const App = () => {
  return (
    <SessionProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireSession>
                <NowPlaying />
              </RequireSession>
            }
          >
            <Route
              path="/profile"
              element={
                <RequireSession>
                  <Profile />
                </RequireSession>
              }
            />
          </Route>
          <Route
            path="/signin"
            element={<SignIn />}
            loader={async () => {
              const { user } = useSession()

              if (user) {
                return <Navigate to="/" replace={true} />
              }
            }}
          />
          <Route
            path="/signup"
            element={<SignUp />}
            loader={async () => {
              const { user } = useSession()

              if (user) {
                return <Navigate to="/" replace={true} />
              }
            }}
          />
        </Route>
      </Routes>
    </SessionProvider>
  )
}
