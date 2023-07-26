import {
  Alert,
  Snackbar,
  type AlertColor,
  type SnackbarOrigin,
} from "@mui/material"
import { styled } from "@mui/system"

export const Snack = ({
  message,
  severity,
}: {
  message: string
  severity: AlertColor
}) => {
  const options: SnackbarOrigin = { vertical: "top", horizontal: "center" }

  return (
    <Snackbar anchorOrigin={options} open={true}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}
