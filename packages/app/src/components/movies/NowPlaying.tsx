import { Container, Grid, Typography } from "@mui/material"
import { MovieCard } from "./MovieCard"

const movies = [1, 2, 3, 4, 5, 6]

export const NowPlaying = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" color="primary">
        Now Playing
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} md={6} lg={4}>
            <MovieCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
