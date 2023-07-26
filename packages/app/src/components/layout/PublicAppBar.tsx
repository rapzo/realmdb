import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material"
import { MovieRounded } from "@mui/icons-material"
import { styled } from "@mui/system"

const StyledToolbar = styled(Toolbar)(() => ({
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
}))

export const PublicAppBar = ({ title = "RealMDB" }: { title?: string }) => {
  return (
    <MuiAppBar position="static">
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          <MovieRounded sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          <MovieRounded sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
        </StyledToolbar>
      </Container>
    </MuiAppBar>
  )
}
