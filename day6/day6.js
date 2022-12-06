const fs = require("fs");

const sum = (prev, cur) => prev + cur;

/**
 *
 * @param {string} data
 * @return A number indicating the start of the packet
 */
const getMarker = (data, MAX = 4) => {
  let visited = {};
  let counter = 0;
  let marker = 0;
  let charCounter = 0;
  for (const idx in data) {
    const chr = data[idx];

    if (visited[chr]) {
      visited[chr] += 1;
    } else {
      visited[chr] = 1;
    }

    const visitedValues = Object.values(visited);
    const total = visitedValues.reduce(sum, 0);
    const isRepeated = visitedValues.some((ele) => ele > 1);
    if (total === MAX && isRepeated) {
      // Reduce 0th element count in a grop of 4
      visited[data[idx - (MAX - 1)]] -= 1;
    } else if (total === MAX) {
      // console.log("Visited : ", visited, data[idx]);
      marker = Number(idx) + 1;
      break;
    }
  }

  return marker;
};

fs.readFile("day6/input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const packetMarker = getMarker(data);
  console.log("Packet marker : ", packetMarker);
  const messageMarker = getMarker(data, 14);
  console.log("Message marker : ", messageMarker);
});
