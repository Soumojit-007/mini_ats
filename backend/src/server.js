import app from "./app.js";
import { config } from "./config/config.js";
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});