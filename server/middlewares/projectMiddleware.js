const Project = require("../models/project");

let projectMiddle = function (req, res, next) {
  let projectID = req.query.projectID;
  let redirectURL = req.query.redirectURL;
  let scope = req.query.scope;

  Project.findOne({ projectID })
    .then(function (project) {
      if (!project) {
        return Promise.reject({
          code: 404,
          message: "Project ID does not exist",
        });
      }
      if (!project.redirectURLs.includes(redirectURL)) {
        return Promise.reject({ code: 400, message: "Redirect URL mismatch" });
      }
      if (project.scope != scope) {
        return Promise.reject({ code: 400, message: "Invalid Scope" });
      }
      req.project = project;
      next();
    })
    .catch(function (e) {
      if (e.code) {
        res.status(e.code).send(e);
      } else {
        res.status(500).send({ message: "Unknown Error" });
      }
    });
};

module.exports = projectMiddle;
