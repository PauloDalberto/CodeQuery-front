type Message = {
  role: "user" | "model",
  parts: string | { text: string }
}
