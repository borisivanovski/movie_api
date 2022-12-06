const express = require("express");
const app = express();
morgan = require("morgan");
fs = require("fs");
path = require("path");

let topMovies = {
  movies: [
    {
      title: "Edward Scissorhands",
    },
    {
      title: "Batman Returns",
    },
    {
      title: "The Nightmare Before Christmas",
    },
    {
      title: "Sleepy Hollow",
    },
    {
      title: "Planet of the Apes",
    },
    {
      title: "Big Fish",
    },
    {
      title: "Charlie and the Chocolate Factory",
    },
    {
      title: "Corpse Bride",
    },
    {
      title: "Alice in Wonderland",
    },
    {
      title: "Frankenweenie",
    },
  ],
};

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(myLogger);
app.use(requestTime);
app.use(morgan("common"));
app.use("/documentation", express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// GET requests

app.get("/", (req, res) => {
  res.send("Welcome to my movie app!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});


// listen for requests
app.listen(8080, () => {
  console.log("My app is listening on port 8080.");
});
