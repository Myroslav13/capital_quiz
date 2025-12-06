import express from "express";
import pg from "pg";

const port = 3000;
const app = express();
var countries = [];
var country, capital, prevCapital, prevScore, score = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
	host: "localhost",
	database: "Udemy",
	password: "myroslav13",
	port: 5432,
});

db.connect();

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    countries = res.rows;
    db.end();
  }
});

function randomNumber(maxNumber) {
  let number = Math.random();
  number *= maxNumber;
  number = Math.floor(number);

  return number;
}

function rendering(res, prevCapital, prevScore, wasCorrect) {
  const number = randomNumber(countries.length);
  country = countries[number].country;
  capital = countries[number].capital;

  res.render("index.ejs", {country: country, capital: capital, prevCapital: prevCapital, prevScore: prevScore, score: score, wasCorrect: wasCorrect});
}

app.get("/", (req, res) => {
  rendering(res, "", 0, true);
});

app.post("/guess", (req, res) => {
  const capitalTyped = req.body.capital;
  prevCapital = capital;
  prevScore = score;
  var rightness = false;

  if (capitalTyped !== capital) {
    score = 0;
  } else {
    score++;
    rightness = true;
  }
  
  rendering(res, prevCapital, prevScore, rightness);
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});