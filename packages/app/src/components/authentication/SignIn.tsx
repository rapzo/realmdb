import { useLocation, useNavigate } from "react-router-dom"
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { styled } from "@mui/system"

import { Link as RoutedLink } from "../navigation/link"
import { useSession } from "../../context/Session"

interface StyledBoxProps extends BoxProps {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>
}
const StyledBox = styled(Box)<StyledBoxProps>((_props) => {
  return {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
})

export function SignIn() {
  const { signIn } = useSession()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    signIn(data.get("email") as string, data.get("password") as string).then(
      () => {
        navigate(from, { replace: true })
      },
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" to={"#"} component={RoutedLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" to="/signup" component={RoutedLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Container>
  )
}
