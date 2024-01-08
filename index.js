// require("dotenv").config();
// const cron = require("node-cron");
// const express = require("express");

// const getImage = require("./imageGenerator");
// const compressImage = require("./reduceImage");
// const postToInsta = require("./uploadLocalImage");

// const app = express();
// const port = process.env.PORT || 3000; // Set the port
// // Get image from DALLE and download it.
// async function main() {
//   try {
//     // Get image from DALLE and download locally
//     await getImage();
//     // Reduce image size usage
//     await compressImage("./downloadedImage.jpeg", "./compressedImage.jpeg");
//     // Post to Instagram
//     await postToInsta();
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Define a route
// app.get("/post-image", async (req, res) => {
//   const result = await main();
//   res.send(result);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // Schedule the task to run every hour
// // cron.schedule("0 * * * *", main);
// main();

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const getImage = require("./imageGenerator");
const compressImage = require("./reduceImage");
const postToInsta = require("./uploadLocalImage");

const app = express();
// Configure CORS to allow requests from the specific URL
const corsOptions = {
  origin: "https://insta.dummy.ink", // Specify the allowed origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

async function main(text) {
  try {
    const imageResult = await getImage(text); // Generate the image
    if (!imageResult || !imageResult.imageUrl) {
      throw new Error("Failed to create image");
    }

    // Continue with the remaining steps
    await compressImage("./downloadedImage.jpeg", "./compressedImage.jpeg");
    await postToInsta();

    return {
      message: "Image posted successfully",
      imageUrl: imageResult.imageUrl,
    };
  } catch (error) {
    console.error(error);
    return { message: error.message || "Failed to post image", imageUrl: null };
  }
}

app.post("/post-image", async (req, res) => {
  const text = req.body.text;
  const result = await main(text);
  console.log("Result", result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
