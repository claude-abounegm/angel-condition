const { rimrafSync } = require("rimraf");
const { globSync } = require("glob");

// Function to delete directories matching the pattern
function removePattern(pattern, directory) {
  const matches = globSync(pattern, {
    ignore: "**/node_modules/**",
    nodir: !directory,
  });

  matches.forEach((dir) => rimrafSync(dir));
}

removePattern("dist/**/__tests__", true);
removePattern("dist/**/*.test.js", false);
