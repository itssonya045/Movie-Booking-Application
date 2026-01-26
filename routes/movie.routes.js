const MovieController = require("../controllers/movie.controller");
const validateMovie= require("../middlewares/validateMovie.middleware");

const routes = (app) => {

  app.post(
    "/mba/api/v1/movies",
    validateMovie,
    MovieController.createMovie
  );

  app.get(
    "/mba/api/v1/movies",
    MovieController.getAllMovies
  );


  app.get(
    "/mba/api/v1/movies/:id",
    validateMovie,
    MovieController.getMovie
  );

  app.delete(
    "/mba/api/v1/movies/:id",
    validateMovie,
    MovieController.deleteMovie
  );

  app.put(
    "/mba/api/v1/movies/:id",
    validateMovie,
    MovieController.updateMovie
  );
};

module.exports = routes;
