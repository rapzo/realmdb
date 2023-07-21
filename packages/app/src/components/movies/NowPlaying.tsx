import { Container, Typography } from "@mui/material"
import { Masonry } from "@mui/lab"
import { MovieCard } from "./MovieCard"
import { useNowPlayingMovies } from "../../queries/useNowPlayingMovies"

export const NowPlaying = () => {
  const { data, isLoading } = useNowPlayingMovies()

  if (isLoading || !data) return null

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" color="primary">
        Now Playing
      </Typography>

      <Masonry columns={3} spacing={2}>
        {data.map((movie, i) => (
          <MovieCard key={`now-playing-movie-${i}`} movie={movie} />
        ))}
      </Masonry>
    </Container>
  )
}
