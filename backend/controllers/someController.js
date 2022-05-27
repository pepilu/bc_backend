const asyncHandler = require("express-async-handler");

const getResults = asyncHandler(async (req, res) => {
  res.status(200).json({ text: "Get results" });
});

const setResult = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    //Express build in error handler
    throw new Error("Please add a text field");
  }
  res.status(200).json({ text: "Create new result" });
});

const updateResult = asyncHandler(async (req, res) => {
  res.status(200).json({ text: `Updated result ${req.params.id}` });
});

const deleteResult = asyncHandler(async (req, res) => {
  res.status(200).json({ text: `Deleted result ${req.params.id}` });
});

module.exports = {
  getResults,
  setResult,
  updateResult,
  deleteResult,
};
