import app from "./app.js";
import { config } from "./config/config.js";
import {connectDB} from "./config/db.js"
app.get("/", (req, res) => {
  res.send("Server is running");
});

const startServer = async() =>{
  await connectDB();
  app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
};


startServer();