import "dotenv/config"
import { main } from "./main"

main().catch((error: Error) => {
  console.error(error)
  process.exit(1)
})
