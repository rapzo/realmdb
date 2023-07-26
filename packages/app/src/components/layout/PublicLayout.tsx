import { Outlet } from "react-router-dom"
import { PublicAppBar } from "./PublicAppBar"

export const PublicLayout = () => {
  return (
    <>
      <PublicAppBar />

      <Outlet />
    </>
  )
}
