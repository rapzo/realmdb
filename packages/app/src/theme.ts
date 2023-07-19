import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00eab7",
    },
    secondary: {
      main: "#f500f1",
    },
    text: {
      primary: "#a59ece",
    },
    error: {
      main: "#e62365",
    },
    info: {
      main: "#6880bf",
    },
    success: {
      main: "#31b504",
    },
    divider: "rgba(230,220,220,0.45)",
    background: {
      default: "#0d253f",
      paper: "#12121f",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#12121f",
        },
      },
    },
  },
})
