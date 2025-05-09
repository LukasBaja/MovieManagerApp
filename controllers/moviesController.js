const Movies = require("../models/Movies.js");
const Director = require("../models/Director.js");

/// @POST /add-movie
const addMovie = async (req, res) => {
  try {
    const { title, description, year, genre, movieDirector } = req.body;
    const movie = new Movies({
      title: title,
      description: description,
      year: year,
      genre: genre,
      movieDirector: movieDirector,
    });
    const savedMovie = await movie.save();
    return res.status(200).json("Movie added successfully" + savedMovie);
  } catch (err) {
    return res.status(500).json("Error adding movie: " + err.message);
  }
};

// @GET /get-movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find().populate(
      "movieDirector",
      "firstName lastName birthDate _id"
    ); // -_id jeigu noriu paslėpti id
    if (!movies) {
      return res.status(404).json("No movies found");
    }
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json("Error fetching movies: " + err.message);
  }
};

// @GET /get-movie/:id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id).populate(
      "movieDirector",
      "firstName lastName birthDate _id"
    );
    if (!movie) {
      return res.status(404).json("No movie found with ID: " + req.params.id);
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json("Error fetching movie: " + err.message);
  }
};

// @PUT /update-movie/:id
const updateMovie = async (req, res) => {
  try {
    const { title, description, year, genre, movieDirector } = req.body;
    const movie = await Movies.findByIdAndUpdate(req.params.id, {
      title: title,
      description: description,
      year: year,
      genre: genre,
      movieDirector: movieDirector,
    });
    if (!movie) {
      return res.status(404).json("No movie found with ID: " + req.params.id);
    }
    return res.status(200).json("Movie updated successfully: " + movie);
  } catch (err) {
    return res.status(500).json("Error updating movie: " + err.message);
  }
};

// @DELETE /delete-movie/:id
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "No movie found with ID: " });
    }
    return res
      .status(200)
      .json({ message: "Movie deleted successfully: ", movie });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting movie: " });
  }
};

module.exports = {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
