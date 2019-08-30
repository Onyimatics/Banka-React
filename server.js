const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 9090;
app.use(express.static(__dirname));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./src/dist/index.html"));
});

app.listen(port, function () {
  console.log(`server started at ${port}`);
});