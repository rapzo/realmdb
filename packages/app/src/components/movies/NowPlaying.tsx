import { Container, Typography } from "@mui/material"
import { Masonry } from "@mui/lab"
import { MovieCard } from "./MovieCard"
import { useNowPlayingMovies } from "./queries"

export const NowPlaying = () => {
  const { data: movies, isLoading: isMoviesLoading } = useNowPlayingMovies()

  if (isMoviesLoading) return null

  if (!movies) return null

  return (
    <Container sx={{ mt: 10 }}>
      <Typography sx={{ mb: 4 }} component="div" variant="h4" color="primary">
        Now Playing
      </Typography>

      <Masonry columns={3} spacing={2}>
        {movies.map((movie, i) => (
          <MovieCard key={`now-playing-movie-${i}`} movie={movie} />
        ))}
      </Masonry>
    </Container>
  )
}
