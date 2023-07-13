import "@fontsource/roboto"

import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"

import { theme } from "./theme"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#606060" },
        }}
      />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  </React.StrictMode>,
)
