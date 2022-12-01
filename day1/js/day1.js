const fs = require("fs");

/**
 *
 * @param {string} allElfsCalories
 * @returns {{highestCalories: number, max3CaloriesTotal: number }} object
 */
const getHighestCalories = (allElfsCalories) => {
  let highestCalories = 0;
  let max3CaloriesTotal = 0;
  const totalCalories = allElfsCalories.split("\n\n").map((eachElf) => {
    const eachElfCalories = eachElf.split("\n");

    const total = eachElfCalories.reduce(
      (total, calorie) => total + parseInt(calorie, 10),
      0
    );
    if (total > highestCalories) {
      highestCalories = total;
    }
    return total;
  });

  totalCalories.sort((a, b) => b - a);

  max3CaloriesTotal = totalCalories
    .slice(0, 3)
    .reduce((total, calories) => total + calories, 0);

  return {
    highestCalories,
    max3CaloriesTotal,
  };
};

fs.readFile("day1/calories.txt", "utf-8", (err, data) => {
  if (err) throw err;

  //   console.log("data :", data);
  const { highestCalories, max3CaloriesTotal } = getHighestCalories(
    data.replace(/[\r]+/gm, "")
  );
  console.log("Highest calories : ", highestCalories);
  console.log("max3 calories : ", max3CaloriesTotal);
});
