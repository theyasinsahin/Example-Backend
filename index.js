const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(userRoutes);

const PORT = 8080;

app.listen(PORT, function() {
    console.log("listening on port",PORT);
});
