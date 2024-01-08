const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadImage(url, filePath) {
  try {
    // Axios GET request to fetch the image as a stream
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    // Create a write stream to save the file
    const writer = fs.createWriteStream(filePath);

    // Pipe the image data to the file
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
}

module.exports = downloadImage;
