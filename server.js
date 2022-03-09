const express = require("express");
const path = require("path");
//paths
const controller = require("./controllers");
//initialize the server
const app = express();
const PORT = process.env.PORT || 3001;
//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//use controllers
app.use("/", controller);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));