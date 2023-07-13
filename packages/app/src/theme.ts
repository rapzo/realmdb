import { createTheme } from "@mui/material"
import { teal, blueGrey } from "@mui/material/colors"

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#1E1E1E",
    },
    primary: {
      main: teal[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
})
