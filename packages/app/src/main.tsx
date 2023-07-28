import "@fontsource/roboto"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"

import { theme } from "./theme"
import { App } from "./App"
import { HttpProvider } from "./providers/Http"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HttpProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={{}} />
          <App />
        </ThemeProvider>
      </HttpProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
