const sharp = require("sharp");
const fs = require("fs");

/**
 * Compress an image to a smaller size.
 * @param {string} inputPath - The path of the image to be compressed.
 * @param {string} outputPath - The path to save the compressed image.
 * @param {number} [quality=80] - The quality of the compressed image (1-100).
 */
const compressImage = async (inputPath, outputPath, quality = 80) => {
  try {
    // Check if the file exists
    if (!fs.existsSync(inputPath)) {
      throw new Error("Input file does not exist");
    }

    // Compress and save the image
    await sharp(inputPath).jpeg({ quality }).toFile(outputPath);

    console.log(`Image compressed and saved to ${outputPath}`);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};
module.exports = compressImage;
