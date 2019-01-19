const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(require("./routes/api"));

app.listen(port, () => {
  console.log(`connected to ${port} port`);
});
