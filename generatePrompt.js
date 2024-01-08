const data = require("./data.json"); // Replace with the actual path to your JSON file

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateDallePrompt() {
  // const dogBreed = getRandomItem(data.dogBreeds);
  const location = getRandomItem(data.nature);

  const verb = "laugh"; // Fixed verb as per requirement
  const keys = [
    "emotions",
    "seasons",
    "timesOfDay",
    "food",
    "toysAndAccessories",
    "fantasy",
  ];

  // Select a random key from the remaining categories
  const randomKey = getRandomItem(keys);
  const randomItem = getRandomItem(data[randomKey]);

  // Construct the prompt
  return `${verb} ${location} ${randomItem}`;
}

const prompt = generateDallePrompt();
console.log("Prompt: ", prompt);
// Export variables in the global scope
module.exports = prompt;
