import { useQuery } from "react-query"
import { Container, Grid, Typography } from "@mui/material"
import { MovieCard } from "./MovieCard"
import { http } from "../../providers/http"

const movies = [1, 2, 3, 4, 5, 6]

export const NowPlaying = () => {
  const { data, isLoading } = useQuery("nowPlaying", async () => {
    return await http.get("/movies/playing")
  })

  console.log("isLoading", isLoading)
  console.log("data", data)

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
