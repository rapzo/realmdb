import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Movie,
} from "@mui/icons-material"
import {
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Card as MuiCard,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"
import { NowPlayingMovie } from "@realmdb/schemas"
import { getPosterPath } from "../../providers/image"

const Card = styled(MuiCard)(({ theme }) => ({
  ...theme.typography.body2,
  position: "relative",
}))

const CardMoviePoster = ({
  title,
  poster,
}: {
  title: string
  poster?: string
}) => {
  return !poster ? (
    <CardMedia>
      <Movie sx={{ height: 500, width: 500 }} />
    </CardMedia>
  ) : (
    <CardMedia
      component="img"
      image={getPosterPath(poster, "w500")}
      alt={title}
    />
  )
}

const Favorite = styled(FavoriteIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))

const NotFavorite = styled(FavoriteBorderIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export const MovieCard = ({
  movie,
  isFavorite,
}: {
  movie: NowPlayingMovie
  isFavorite?: boolean
}) => {
  const favoriteProps = { fontSize: "large" }

  return (
    <Card>
      <CardActions sx={{ position: "absolute" }}>
        <IconButton aria-label="add to favorites">
          {isFavorite ? (
            <Favorite {...favoriteProps} />
          ) : (
            <NotFavorite {...favoriteProps} />
          )}
        </IconButton>
      </CardActions>
      <CardMoviePoster title={movie.title} poster={movie.poster} />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {movie.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color="text.secondary">{movie.overview}</Typography>
      </CardContent>
    </Card>
  )
}
