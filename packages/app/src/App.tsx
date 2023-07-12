import { useState } from "react"
import { name } from "@realmdb/types"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>RealMDB</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Name is {name} {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
