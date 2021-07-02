const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { videoToken } = require("./tokens");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

//Routes
const User = require("./models/user");
const userRouter = require("./routes/User");
//Routes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(pino);
app.use(cors());

//---------------------------------------------------------

//Passport Intialization --start

// app.use(passport.initialize());
// app.use(passport.session());

//Passport Intialization --end

//---------------------------------------------------------

// Data Base Connection --start

const uri =
  "mongodb+srv://admin-sam:sampreeth@cluster0.r5spk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => console.log(err));

// mongoose.set("useFindAndModify", false);

// Data Base Connection --end

//---------------------------------------------------------

//---------------------------------------------------------

//Tokens for Video Call API
const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

//---------------------------------------------------------

//Routes

app.use("/user", userRouter);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log("Express server is running on localhost:3001")
);
