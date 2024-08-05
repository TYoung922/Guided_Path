const express = require("express");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
// Middleware to serve static files
app.use(express.static(__dirname + "/public"));

//admin router
app.use("/", require("./server/routes/admin"));

//router to post clients
app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./server/routes/main"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressLayouts);
app.set("layout", "./layouts/admin-dash");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// const insertClientData = require("./server/models/Clients");
// insertClientData();

app.use(
  session({
    secret: "best number",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/wait_list.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
