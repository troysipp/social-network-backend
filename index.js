const express = require("express");
const app = express();
// const parser = require("body-parser");

app.listen(3001, () => {
  console.log("app listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("hello there");
});
