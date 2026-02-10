const theatreController = require("../controllers/theatre.controller");
const {
  validateTheatreCreateRequest,
  validateUpdateMoviesRequest,
} = require("../middlewares/validateTheatre.middleware");

const { isAuthenticated, isAdminOrClient } = require("../middlewares/auth.middleware");

const routes = (app) => {

  app.post(
    "/mba/api/v1/theatre",
    isAuthenticated,
    isAdminOrClient,
    validateTheatreCreateRequest,
    theatreController.create
  );

  app.get("/mba/api/v1/theatre/:id", theatreController.getTheater);
  app.get("/mba/api/v1/theatre", theatreController.getAllTheater);

  app.delete(
    "/mba/api/v1/theatre/:id",
    isAuthenticated,
    isAdminOrClient,
    theatreController.deleteTheater
  );

  app.patch(
    "/mba/api/v1/theatre/:id",
    isAuthenticated,
    isAdminOrClient,
    theatreController.updateTheatre
  );

  app.patch(
    "/mba/api/v1/theatre/:id/movies",
    isAuthenticated,
    isAdminOrClient,
    validateUpdateMoviesRequest,
    theatreController.updateMovies
  );

  app.get(
    "/mba/api/v1/theatre/:id/movies",
    theatreController.getMovies
  );
};

module.exports = routes;
