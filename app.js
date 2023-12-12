const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

// get the mean
app.get("/mean", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
  const sum = nums.reduce((acc, b) => acc + b, 0);
  const mean = sum / nums.length;
  return res.json({ operation: "mean", value: mean });
});

//get the median
app.get("/median", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
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
  const nums = req.query.nums.split(",").map(Number);

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

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
