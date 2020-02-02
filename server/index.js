const express = require("express");
const next = require("next");
const routes = require("../routes");

//SERVICES
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const secretData = [
  {
    title: "secret data 1",
    description: "this for my bussiness logic :)"
  },
  {
    title: "secret data 2",
    description: "this is for my facorit labtop :("
  }
];

app
  .prepare()
  .then(() => {
    const server = express();

    /**
     * this is for solving clear url problem in dynamic routing for next version before 9
     * we handle out request to render our portfolio page : )
     
     */
    // server.get("/portfolio/:id", (req, res) => {
    //   const actualPage = "/portfolio";
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });
    server.get(
      "/api/v1/onlyowner",
      authService.checkJWT,
      authService.checkRole("siteOwner"),
      (req, res) => {
        return res.json(secretData);
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    // server.use(function(err, req, res, next) {
    //   if (err.name === "UnauthorizedError") {
    //     res.status(401).send({
    //       title: "UnAuthorized",
    //       detail: "UnAuthorized Access !"
    //     });
    //   }
    // });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
