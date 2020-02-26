const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const routes = require("../routes");

//SERVICES
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require("./config");
const Book = require("./models/book");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/api/book");
const portfolioRoutes = require("./routes/api/portflio");
const portfolioPageRoutes = require("./routes/pages");

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

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("DataBase Connected"))
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use("/api/v1/books", bookRoutes);
    server.use("/api/v1/portfolios", portfolioRoutes);
    server.use(portfolioPageRoutes, (req, res) => {
      if (req.currentPath && req.currentPath === "/portfolios") {
        app.render(req, res, req.currentPath, req.allPortfolios);
      } else return handle(req, res);
    });

    /**
     * this is for solving clear url problem in dynamic routing for next version before 9
     * we handle out request to render our portfolio page : )
     
     */
    // server.get("/portfolio/:id", (req, res) => {
    //   const actualPage = "/portfolio";
    //   const queryParams = { id: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    // server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
    //   return res.json(secretData);
    //   res.
    // });
    // server.get(
    //   "/api/v1/onlyowner",
    //   authService.checkJWT,
    //   authService.checkRole("siteOwner"),
    //   (req, res) => {
    //     return res.json(secretData);
    //   }
    // );

    // server.get("*", (req, res) => {
    //   return handle(req, res);
    // });

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

// mongodb+srv://test:testtest@cluster0-qzzli.mongodb.net/test?retryWrites=true&w=majority
exports.app = app;
