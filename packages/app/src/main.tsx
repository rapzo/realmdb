import "@fontsource/roboto"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"

import { theme } from "./theme"
import { App } from "./App"

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </>
  </React.StrictMode>,
)
