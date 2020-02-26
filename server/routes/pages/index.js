const express = require("express");
const router = express.Router();

const Portfolio = require("../../models/portfolio");

router.get("/portfolios", (req, res, next) => {
  Portfolio.find({})
    .sort({ startDate: 1 })
    .exec((err, allPortfolios) => {
      if (err) {
        return res.status(422).send(err);
      }
      req.allPortfolios = { allPortfolios };
      req.currentPath = "/portfolios";
      next();
    });
});

module.exports = router;
