const Portfolio = require("../models/portfolio");
const app = require("../index");

exports.getPortfolios = (req, res) => {
  Portfolio.find({})
    .sort({ startDate: 1 })
    .exec((err, foundedPortfolios) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(foundedPortfolios);
    });
};
exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.findById(portfolioId)
    .select("-__v")
    .exec((err, foundedPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(foundedPortfolio);
    }); // ignore __v property beacase form can not validate
  //__v prop makes error object not null
};

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;
  const userId = req.user && req.user.sub;
  portfolioData.userId = userId;
  const portfolio = new Portfolio(portfolioData);
  portfolio.save((err, savedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(savedPortfolio);
  });
};

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  console.log(portfolioId);
  const portfolioData = req.body;
  Portfolio.findById(portfolioId, (err, foundedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    foundedPortfolio.set(portfolioData);
    foundedPortfolio.save((err, savedPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(savedPortfolio);
    });
  });
};

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.deleteOne(
    { _id: portfolioId },
    (err, deletedPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(deletedPortfolio);
    }
  );
};
