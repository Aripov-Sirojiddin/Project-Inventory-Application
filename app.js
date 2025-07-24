const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const methodOverride = require("method-override");
const indexRouter = require("./routers/indexRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.use(express.static(assetsPath));

app.use(expressLayouts);
app.set("layout", "layout");

app.use("/", indexRouter);
app.use("/new", indexRouter);

app.get("/*splat", (req, res) => {
  res.status(404).render(path.join(__dirname, "views/pages/404.ejs"));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
