import type { Favorite } from "@realmdb/schemas"
import { Container, Typography } from "@mui/material"
import { Masonry } from "@mui/lab"
import { MovieCard } from "./MovieCard"
import { useNowPlayingMovies } from "../../queries/useNowPlayingMovies"
import { useFavorites } from "../../queries/useFavorites"

const isFavorite = (favorites: Favorite[], movieId: number) => {
  return Boolean(favorites.find((favorite) => favorite.movieId === movieId))
}

export const NowPlaying = () => {
  const { data: movies, isLoading: isMoviesLoading } = useNowPlayingMovies()
  const { data: favorites, isLoading: isFavoritesLoading } = useFavorites()

  if (isMoviesLoading || isFavoritesLoading) return null

  if (!movies) return null

  return (
    <Container sx={{ mt: 10 }}>
      <Typography sx={{ mb: 4 }} component="div" variant="h4" color="primary">
        Now Playing
      </Typography>

      <Masonry columns={3} spacing={2}>
        {movies.map((movie, i) => (
          <MovieCard
            key={`now-playing-movie-${i}`}
            movie={movie}
            isFavorite={isFavorite(favorites || [], movie.id)}
          />
        ))}
      </Masonry>
    </Container>
  )
}
