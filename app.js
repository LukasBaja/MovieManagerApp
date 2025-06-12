require("dotenv").config();
const connection = require("./dbConfig/connectionController.js");
const {
  addDirector,
  getDirector,
  getDirectorById,
  updateDirector,
  deleteDirector,
} = require("./controllers/directorController.js");
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("./controllers/moviesController.js");

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

connection();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/add-director", addDirector);
app.get("/get-director", getDirector);
app.get("/get-director/:id", getDirectorById);
app.put("/update-director/:id", updateDirector);
app.delete("/delete-director/:id", deleteDirector);

app.post("/add-movie", addMovie);
app.get("/get-movies", getMovies);
app.get("/get-movie/:id", getMovieById);
app.put("/update-movie/:id", updateMovie);
app.delete("/delete-movie/:id", deleteMovie);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
