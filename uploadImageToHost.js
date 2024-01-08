const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const imagePath = "./downloadedImage.jpeg"; // Replace with the path to your image

const uploadImageToPostimages = async () => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(
      "https://api.postimages.org/1/upload",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        params: {
          format: "json",
        },
      }
    );

    console.log(
      "Image uploaded successfully. Image URL:",
      response.data.data.file.url
    );
  } catch (error) {
    console.error("Error uploading the image:", error);
  }
};

uploadImageToPostimages();
