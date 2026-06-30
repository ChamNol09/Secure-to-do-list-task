const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/adminRoute");
const taskRoute = require("./routes/taskRoute");
const deadlineJob = require("./jobs/deadlineJob");
const telegramRoute = require("./routes/telegramRouter");
const helmet = require("helmet");
const userRoute = require("./routes/user.route");
const path = require("path");
dotenv.config();
require("./telegrams/bot");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(cors());
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/task", taskRoute);
app.use("/api/telegram", telegramRoute);
app.use("/api/avatar", userRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
