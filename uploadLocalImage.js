require("dotenv").config();

const express = require("express");
const getImage = require("./imageGenerator");
const { IgApiClient } = require("instagram-private-api");
const generateCaption = require("./generateCaption");
const fs = require("fs").promises; // Add this line
const postToInsta = async () => {
  try {
    const ig = new IgApiClient();
    const caption = await generateCaption();
    console.log("CAPTION", caption);

    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const url = await getImage().then((data) => data);

    // Replace the URL fetching with local file reading
    const imageBuffer = await fs.readFile("./compressedImage.jpeg");

    await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    // After successful upload, delete the images
    await fs.unlink("./downloadedImage.jpeg");
    await fs.unlink("./compressedImage.jpeg");
    console.log("Temporary files deleted successfully.");
    return {
      success: true,
      message: "Image posted to Instagram successfully.",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to post image to Instagram." };
  }
};

module.exports = postToInsta;
