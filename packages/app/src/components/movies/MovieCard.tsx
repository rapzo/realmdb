import {
  Favorite as MuiFavoriteIcon,
  FavoriteBorder as MuiFavoriteBorderIcon,
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
import { ReactEventHandler, useState } from "react"
import { getPosterPath } from "../../helpers/image"
import { http } from "../../providers/Http"

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

const FavoriteIcon = styled(MuiFavoriteIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))

const NotFavoriteIcon = styled(MuiFavoriteBorderIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const Favorite = ({
  isFavorite,
  onClick,
}: {
  isFavorite: boolean
  onClick: ReactEventHandler
}) => {
  const iconProps = { fontSize: "large" }

  return (
    <IconButton aria-label="Favorite!" onClick={onClick}>
      {isFavorite ? (
        <FavoriteIcon {...iconProps} />
      ) : (
        <NotFavoriteIcon {...iconProps} />
      )}
    </IconButton>
  )
}

export const MovieCard = ({
  movie,
  isFavorite,
}: {
  movie: NowPlayingMovie
  isFavorite: boolean
}) => {
  const [favorite, setFavorite] = useState(isFavorite)

  const handleFavoriteClick: ReactEventHandler = (e) => {
    e.preventDefault()

    http
      .post(`/movies/favorite`, {
        movieId: movie.id,
      })
      .then(() => {
        if (favorite) {
          setFavorite(false)
        } else {
          setFavorite(true)
        }
      })
  }

  return (
    <Card>
      <CardActions sx={{ position: "absolute" }}>
        <Favorite isFavorite={favorite} onClick={handleFavoriteClick} />
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
