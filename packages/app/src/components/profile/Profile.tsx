import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material"
import { useSession } from "../../context/Session"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
}))

export const Profile = () => {
  const { user } = useSession()

  console.log("user", user)

  if (!user) {
    return null
  }

  const { email, firstName, lastName, avatarUrl } = user
  return (
    <Container sx={{ py: 8 }}>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Typography component="h3" variant="h3" gutterBottom>
          Profile
        </Typography>
      </Box>
      <Item elevation={24} variant="outlined">
        <Grid container spacing={2}>
          <Grid xs={8} item>
            <Box>
              <Typography component="h5" variant="h5" gutterBottom>
                Username
              </Typography>
              <Typography component="h4" variant="h4" color="primary">
                {email}
              </Typography>
            </Box>
            <Box sx={{ mt: 10 }}>
              <Typography component="h5" variant="h5" gutterBottom>
                Name
              </Typography>
              <Typography component="h4" variant="h4" color="secondary">
                {firstName} {lastName}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={4} item>
            <Box>
              <Avatar sx={{ width: 256, height: 256 }} src={avatarUrl} />
            </Box>
          </Grid>
        </Grid>
      </Item>
    </Container>
  )
}
