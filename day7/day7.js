const fs = require("fs");

const doCommands = (data) => {
  const instructions = data.split("\n");
  let rootDir = {};
  let currentDir = {};
  instructions.forEach((instruction) => {
    const [dirOrFile, cmdOrName, path] = instruction.split(" ");

    if (cmdOrName === "cd") {
      if (path === "/") {
        rootDir = currentDir = {
          name: "root",
          parent: null,
          dirs: [],
          files: [],
          size: 0,
        };
      } else if (path === "..") {
        currentDir = currentDir.parent;
      } else {
        currentDir = currentDir.dirs.find((dir) => dir.name === path);
      }
    }
    if (dirOrFile === "dir") {
      const newDir = {
        name: cmdOrName,
        parent: currentDir,
        dirs: [],
        files: [],
        size: 0,
      };
      currentDir.dirs.push(newDir);
    } else if (!isNaN(Number(dirOrFile))) {
      const newFile = { name: cmdOrName, size: Number(dirOrFile) };
      currentDir.files.push(newFile);
      updateDirSize(currentDir, newFile.size);
    }
  });

  // console.log(rootDir);

  return rootDir;
};

const updateDirSize = (directory, size) => {
  if (directory.parent != null) {
    updateDirSize(directory.parent, size);
  }
  directory.size += size;
};

const getTotalSize = (directory, MAX = 100000) => {
  let totalSize = directory.size <= MAX ? directory.size : 0;
  directory.dirs.forEach((dir) => {
    totalSize += getTotalSize(dir, MAX);
  });
  return totalSize;
};

const getSmallestDirSize = (directory, MIN = 0) => {
  let minSize = directory.size >= MIN ? directory.size : 0;
  directory.dirs.forEach((dir) => {
    const size = getSmallestDirSize(dir, MIN);
    if (size !== 0 && size < minSize) minSize = size;
  });
  return minSize;
};

fs.readFile("day7/input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const rootDir = doCommands(data.replace(/[\r]+/gim, ""));
  const totalSize = getTotalSize(rootDir, 100000);
  // console.log("total size : ", totalSize);

  const diskSpace = 70000000;
  const updateSpace = 30000000;
  const freeSpace = diskSpace - rootDir.size;
  const spaceRequired = updateSpace - freeSpace;

  console.log("Space occupied", rootDir.size);
  console.log("Free space", freeSpace);
  console.log("Space required", spaceRequired);

  const sizeOfDirToBeDeleted = getSmallestDirSize(rootDir, spaceRequired);
  console.log("Size of dir to be deleted", sizeOfDirToBeDeleted);
});
