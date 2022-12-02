/*
A - Rock     - 1
B - Paper    - 2
C - Scissors - 3

X Lose - 0
Y Draw - 3
Z Win  - 6

Guide :
-------
A X - SCISSORS 3 + 0 = 3 (3)
A Y - ROCK     1 + 3 = 4 (1)
A Z - PAPER    2 + 6 = 8 (2)

B X - ROCK     1 + 0 = 1 (1)
B Y - PAPER    2 + 3 = 5 (2)
B Z - SCISSORS 3 + 6 = 9 (3)

C X - PAPER    2 + 0 = 2 (2)
C Y - SCISSORS 3 + 3 = 6 (6)
C Z - ROCK     1 + 6 = 7 (7)

*/

const fs = require("fs");

const LOSE = 0,
  DRAW = 3,
  WIN = 6;
const ROCK = 1,
  PAPER = 2,
  SCISSORS = 3;

const rpsMap = {
  A: 1,
  B: 2,
  C: 3,
  X: 0,
  Y: 3,
  Z: 6,
};

/**
 *
 * @param {string} rpsData
 * @returns number
 */
const getRPSTotalScore = (rpsData) => {
  const allRounds = rpsData.split("\n");
  const total = allRounds.reduce((total, eachRound) => {
    const [elf, strategy] = eachRound.split(" ");

    let roundTotal = 0;

    if (rpsMap[strategy] === WIN)
      roundTotal += WIN + (rpsMap[elf] === SCISSORS ? ROCK : rpsMap[elf] + 1);
    else if (rpsMap[strategy] === LOSE)
      roundTotal += LOSE + (rpsMap[elf] === ROCK ? SCISSORS : rpsMap[elf] - 1);
    else roundTotal += DRAW + rpsMap[elf];

    console.log("round total : ", roundTotal);
    return roundTotal + total;
  }, 0);
  return total;
};

fs.readFile("day2/rps.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const total = getRPSTotalScore(data.replace(/[\r]+/gim, ""));
  console.log("Total points : ", total);
});
