const asyncHandler = require("express-async-handler");
const Result = require("../models/someModel");

const getResults = asyncHandler(async (req, res) => {
  const results = await Result.find();
  res.status(200).json(results);
});

const setResult = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    //Express build in error handler
    throw new Error("Please add a text field");
  }
  const result = await Result.create({
    text: req.body.text,
  });
  res.status(200).json(result);
});

const updateResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);
  if (!result) {
    res.status(400);
    //Express build in error handler
    throw new Error("Result not found");
  }
  const updatedResult = await Result.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedResult);
});

const deleteResult = asyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);
  if (!result) {
    res.status(400);
    //Express build in error handler
    throw new Error("Result not found");
  }
  await result.remove();
  res.status(200).json({ text: `Deleted result ${req.params.id}` });
});

module.exports = {
  getResults,
  setResult,
  updateResult,
  deleteResult,
};
