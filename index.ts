import app from "./app"

const { SERVER_PORT } = process.env

app.listen(SERVER_PORT as string, () => {
  console.log("Server is running")
})
