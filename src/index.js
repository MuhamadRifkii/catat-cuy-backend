const express = require("express");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send({
    message: "Hallo 👋",
    status: "Server ready 🚀",
  });
});

app.listen(port, () => {
  console.log(`Server ready listening on http://localhost:${port}`);
});
