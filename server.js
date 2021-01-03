const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
