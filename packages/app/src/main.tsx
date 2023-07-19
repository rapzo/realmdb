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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{}} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </>
  </React.StrictMode>,
)
