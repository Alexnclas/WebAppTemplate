const connectDB = require("./src/config/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mediaRouter = require('./src/routes/media');
const usersRouter = require('./src/routes/users');
const healthRouter = require('./src/routes/health');

// connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/medias', mediaRouter);
app.use('/auth', usersRouter);
app.use('/health', healthRouter);

const backendPort = process.env.BACKEND_PORT || 5000;

app.listen(backendPort, "0.0.0.0", () =>{
  console.log(`Backend server running on ${backendPort}`);
});

