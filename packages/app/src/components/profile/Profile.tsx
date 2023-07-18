import { Container } from "@mui/material"
import { http } from "../../providers/http"

export const Profile = () => {
  http.get("/profile").then((res) => console.log(res))
  return <Container>Profile</Container>
}
