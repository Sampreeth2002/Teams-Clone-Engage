const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { videoToken } = require("./tokens");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
//MongoDB Schema
const User = require("./models/user");
//MongoDB Schema
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(pino);

//---------------------------------------------------------

//Passport Intialization --start

// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     credentials: true,
//   })
// );

app.use(cors());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig")(passport);

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

mongoose.set("useFindAndModify", false);

// Data Base Connection --end

//---------------------------------------------------------

//Temporary Auth Routes --start

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Wrong Credentails");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfull login");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne(
    { username: req.body.username, email: req.body.email },
    async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });

        await newUser.save();
        res.send("User Created");
      }
    }
  );
});

app.get("/user", (req, res) => {
  res.send(req.user); //Entire Data
});

//Temporary Auth Routes --end

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
