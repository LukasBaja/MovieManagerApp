const Director = require("../models//Director.js");

/// @POST /add-director

const addDirector = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const existDirector = await Director.findOne({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
    });
    if (existDirector) {
      return res.status(400).json("Director already exists");
    }

    const director = new Director({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
    });
    const savedDirector = await director.save();
    res.status(200).json("Director added successfully" + savedDirector);
  } catch (err) {
    return res.status(500).json("Error adding director: " + err.message);
  }
};

// @GET /get-director

const getDirector = async (req, res) => {
  try {
    const directors = await Director.find();
    if (!directors) {
      return res.status(404).json("No directors found");
    }
    res.status(200).json(directors);
  } catch (err) {
    return res.status(500).json("Error fetching directors: " + err.message);
  }
};

// @GET /get-director/:id
const getDirectorById = async (req, res) => {
  try {
    const directors = await Director.findById(req.params.id);
    if (!directors) {
      return res.status(404).json("No directors found" + req.params.id);
    }
    res.status(200).json(directors);
  } catch (err) {
    return res.status(500).json("Error fetching directors: " + err.message);
  }
};

// @PUT /update-director/:id

const updateDirector = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const director = await Director.findByIdAndUpdate(req.params.id, {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
    });
    if (!director) {
      return res
        .status(404)
        .json("No director found with ID: " + req.params.id);
    }
    res.status(200).json("Director updated successfully: " + director);
  } catch (err) {
    return res.status(500).json("Error updating director: " + err.message);
  }
};

// @DELETE /delete-director/:id
const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res
        .status(404)
        .json("No director found with ID: " + req.params.id);
    }
    res.status(200).json("Director deleted successfully: " + director);
  } catch (err) {
    return res.status(500).json("Error deleting director: " + err.message);
  }
};

module.exports = {
  addDirector,
  getDirector,
  getDirectorById,
  updateDirector,
  deleteDirector,
  // add any other functions you want to export here
};
