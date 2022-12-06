const fs = require("fs");

const getLimits = (section) =>
  section.split("-").map((sec) => parseInt(sec, 10));

const getAllOverlaps = (sections) => {
  const sectionPairs = sections.split("\n");
  const totalOverlaps = sectionPairs.reduce((total, sectionPair) => {
    const [section1, section2] = sectionPair.split(",");
    const [sec1Lower, sec1Upper] = getLimits(section1);
    const [sec2Lower, sec2Upper] = getLimits(section2);
    if (sec2Lower >= sec1Lower && sec2Lower <= sec1Upper) total += 1;
    else if (sec2Upper >= sec1Lower && sec2Upper <= sec1Upper) total += 1;
    else if (sec1Lower >= sec2Lower && sec1Lower <= sec2Upper) total += 1;
    else if (sec1Upper >= sec2Lower && sec1Upper <= sec2Upper) total += 1;

    return total;
  }, 0);

  return totalOverlaps;
};

const getFullyOverlappingPairs = (sections) => {
  const sectionPairs = sections.split("\n");

  const totalOverlaps = sectionPairs.reduce((total, sectionPair) => {
    const [section1, section2] = sectionPair.split(",");
    const [sec1Lower, sec1Upper] = getLimits(section1);
    const [sec2Lower, sec2Upper] = getLimits(section2);
    if (sec2Lower >= sec1Lower && sec1Upper >= sec2Upper) total += 1;
    else if (sec1Lower >= sec2Lower && sec2Upper >= sec1Upper) total += 1;

    return total;
  }, 0);

  return totalOverlaps;
};

fs.readFile("day4/sectionPairs.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const completeOverLapsCount = getFullyOverlappingPairs(
    data.replace(/[\r]+/gim, "")
  );
  const allOverLaps = getAllOverlaps(data.replace(/[\r]+/gim, ""));
  console.log("completeOverLapsCount : ", completeOverLapsCount);
  console.log("allOverLaps : ", allOverLaps);
});
