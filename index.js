import express from "express";
import pg from "pg";

const port = 3000;
const app = express();

const country = "n";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {country: country});
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});