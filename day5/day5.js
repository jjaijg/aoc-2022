const fs = require("fs");

/**
 *
 * @param {string} allCrates
 * @return
 */
const prepareStacks = (allCrates) => {
  const splittedCrates = allCrates.split("\n");
  let allStacks = Array.from(
    Array(Math.ceil(splittedCrates[0].length / 4)),
    () => []
  ); // 4 -> Length of each crate '[M] '
  splittedCrates.forEach((row, idx) => {
    if (idx === splittedCrates.length - 1) return;
    let colIdx = 0;
    for (let i = 0; i < row.length; i += 4) {
      if (row.substring(i, i + 3) !== "   ") {
        allStacks[colIdx].push(row.substring(i, i + 3));
      }
      colIdx += 1;
    }
  });

  return allStacks;
};

/**
 *
 * @param {string} allStacks
 * @returns sting[]
 */
const doIntructions = (instructions, allStacks) => {
  //   console.log("Instructions : ", instructions.split("\n"));
  instructions.split("\n").forEach((instruction, idx) => {
    let [counter, from, to] = instruction
      .replace(/move/gm, "")
      .replace(/from|to/gm, "-")
      .split("-")
      .map(Number);

    let cratesToBeMoved = allStacks[from - 1].splice(0, counter);
    // cratesToBeMoved.reverse(); // commented it for part two
    if (idx === 1)
      console.log("from, to, crates : ", from - 1, to - 1, cratesToBeMoved);
    allStacks[to - 1].unshift(...cratesToBeMoved);
  });

  return allStacks;
};

const getCratesAtTop = (allStacks) => {
  let top = allStacks.reduce((top, stack) => top + stack[0], "");
  top = top.replace(/\[|\]/gm, "");

  return top;
};

const main = () => {
  let stacks = [];
  // Prepare stacks
  fs.readFile("day5/inputs.txt", "utf-8", (err, data) => {
    if (err) throw err;
    const allData = data.replace(/[\r]/gim, "");
    const [crates, instructions] = allData.split("\n\n");
    stacks = prepareStacks(crates);
    console.log("Stacks : ", stacks);
    stacks = doIntructions(instructions, stacks);
    console.log("Stacks after instructions : ", stacks);
    const cratesAtTop = getCratesAtTop(stacks);
    console.log("Crates at top : ", cratesAtTop);
  });
};

main();
