const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

// get the mean
app.get("/mean", (req, res, next) => {
  if (!req.query.nums) {
    return next(new ExpressError("nums are required", 400));
  }
  const numsStr = req.query.nums.split(",");
  for (let numStr of numsStr) {
    const number = Number(numStr);
    if (Number.isNaN(number)) {
      return next(new ExpressError(`${numStr} is not a number`, 400));
    }
  }
  const nums = numsStr.map(Number);
  const sum = nums.reduce((acc, b) => acc + b, 0);
  const mean = sum / nums.length;
  return res.json({ operation: "mean", value: mean });
});

//get the median
app.get("/median", (req, res, next) => {
  if (!req.query.nums) {
    return next(new ExpressError("nums are required", 400));
  }
  const numsStr = req.query.nums.split(",");
  for (let numStr of numsStr) {
    const number = Number(numStr);
    if (Number.isNaN(number)) {
      return next(new ExpressError(`${numStr} is not a number`, 400));
    }
  }
  const nums = numsStr.map(Number);
  nums.sort((a, b) => a - b);

  let median;
  const midIndex = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    median = (nums[midIndex - 1] + nums[midIndex]) / 2;
  } else {
    median = nums[midIndex];
  }

  return res.json({ operation: "median", value: median });
});

// get the mode
app.get("/mode", (req, res, next) => {
  if (!req.query.nums) {
    return next(new ExpressError("nums are required", 400));
  }
  const numsStr = req.query.nums.split(",");
  for (let numStr of numsStr) {
    const number = Number(numStr);
    if (Number.isNaN(number)) {
      return next(new ExpressError(`${numStr} is not a number`, 400));
    }
  }
  const nums = numsStr.map(Number);

  const freqMap = {};
  let maxFreq = 0;
  let mode;

  for (let num of nums) {
    freqMap[num] = (freqMap[num] || 0) + 1;
    if (freqMap[num] > maxFreq) {
      maxFreq = freqMap[num];
      mode = num;
    }
  }

  res.json({ operation: "mode", value: mode });
});

app.use((err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  return res.status(status).json({
    error: { message, status },
  });
});

// app.listen(3000, function () {
//   console.log("Server running on port 3000");
// });

module.exports = app;
