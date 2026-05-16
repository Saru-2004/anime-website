const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes =
  require("./routes/authRoutes");

const favoriteRoutes =
  require("./routes/favoriteRoutes");

const app = express();

const PORT = process.env.PORT || 3000;


// ======================
// MIDDLEWARE
// ======================

// Read JSON
app.use(express.json());

// Read form data
app.use(express.urlencoded({
  extended:true
}));


// ======================
// SESSION
// ======================

app.use(session({

  secret:"anime-secret-key",

  resave:false,

  saveUninitialized:false

}));


// ======================
// STATIC PUBLIC FOLDER
// ======================

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


// ======================
// ROUTES
// ======================

app.use(authRoutes);

app.use(favoriteRoutes);


// ======================
// MAIN ROUTE
// ======================

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "public",
      "index.html"
    )
  );

});


// ======================
// SERVER START
// ======================

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});