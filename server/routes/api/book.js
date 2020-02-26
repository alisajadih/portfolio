const express = require("express");
const router = express.Router();
const bookControllers = require("../../controllers/book");

router.post("", bookControllers.saveBook);

router.get("", bookControllers.getBooks);

router.patch("/:id", bookControllers.updateBook);
router.delete("/:id", bookControllers.deletBook);
module.exports = router;
