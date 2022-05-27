const express = require("express");
const router = express.Router();
const {
  getResults,
  setResult,
  updateResult,
  deleteResult,
} = require("../controllers/someController");

router.route("/").get(getResults).post(setResult);
router.route("/:id").put(updateResult).delete(deleteResult);

module.exports = router;
