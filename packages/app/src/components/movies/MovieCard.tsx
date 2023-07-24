import { Favorite, MoreVert, Movie, Share } from "@mui/icons-material"
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Card as MuiCard,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"
import { NowPlayingMovie } from "@realmdb/schemas"
import { useState } from "react"
import { getPosterPath } from "../../providers/image"

const Card = styled(MuiCard)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(4),
}))

export const MovieCard = ({ movie }: { movie: NowPlayingMovie }) => {
  return (
    <Card>
      {/* <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={movie.title}
        subheader={movie.releaseDate}
      /> */}
      {movie.poster ? (
        <CardMedia
          component="img"
          image={getPosterPath(movie.poster, "w500")}
          alt={movie.title}
        />
      ) : (
        <Movie sx={{ width: 500, height: 500 }} />
      )}
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {movie.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}
