const express = require("express");
const path = require("path");

const controller = require("./controllers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", controller);

app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});