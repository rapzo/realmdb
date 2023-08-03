import { Navigate, Route, Routes } from "react-router-dom"
import { RequireSession, SessionProvider, useSession } from "./context/Session"
import { SignUp } from "./components/authentication/SignUp"
import { SignIn } from "./components/authentication/SignIn"
import { Layout } from "./components/layout/Layout"
import { Profile } from "./components/profile/Profile"
import { NowPlaying } from "./components/movies/NowPlaying"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PublicLayout } from "./components/layout/PublicLayout"
import { Favorites } from "./components/movies/Favorites"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const App = () => {
  return (
    <SessionProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireSession>
              <QueryClientProvider client={queryClient}>
                <Layout />
              </QueryClientProvider>
            </RequireSession>
          }
        >
          <Route index element={<NowPlaying />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        <Route element={<PublicLayout />}>
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
