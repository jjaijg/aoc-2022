const fs = require("fs");

const priorityMap = {};
for (const x of Array(26).keys()) {
  priorityMap[String.fromCharCode("a".charCodeAt(0) + x)] = x + 1;
}
for (const x of Array(26).keys()) {
  priorityMap[String.fromCharCode("A".charCodeAt(0) + x)] = x + 27;
}

/**
 *
 * @param {string} items
 * @returns number
 */
const getPriorityScore = (items) => {
  const priorityTotal = items.split("\n").reduce((totalScore, allItems) => {
    const middle = allItems.length / 2;
    const first = allItems.substring(0, middle);
    const second = allItems.substring(middle);

    const visited = {};
    for (const item of first) {
      let isShared = second.includes(item);

      totalScore += isShared && !visited[item] ? priorityMap[item] : 0;

      if (!visited[item]) visited[item] = true;
    }

    return totalScore;
  }, 0);
  return priorityTotal;
};

/**
 *
 * @param {string[]} items
 * @returns number
 */
const getScore = (items) => {
  const [items1, items2, items3] = items;

  for (const item of items1) {
    if (items2.includes(item) && items3.includes(item)) {
      return priorityMap[item];
    }
  }

  return 0;
};

/**
 *
 * @param {string} items
 * @returns number
 */
const getGroupPriorityScore = (items) => {
  const allGroups = items.split("\n");
  let total = 0;

  while (allGroups.length) {
    const group = allGroups.splice(0, 3);
    total += getScore(group);
  }

  return total;
};

fs.readFile("day3/items.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const priorityScore = getPriorityScore(data.replace(/[\r]+/gim, ""));
  console.log("Priority score : ", priorityScore);

  const groupPriorityScore = getGroupPriorityScore(
    data.replace(/[\r]+/gim, "")
  );
  console.log("Group Priority score : ", groupPriorityScore);
});
