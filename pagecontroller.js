// /////////////////// working   with axios /////////////////////////

const axios = require("axios");
const puppeteer = require("puppeteer");
const path = require("path"); // Make sure you have path module imported
const fs = require("fs");

const showhomepage = async (req, res) => {
  res.render("index", {
    downloadUrl: "",
  });
};

/////


const getDirectVideoUrl = async (instagramUrl) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Set up an event listener for handling errors
  page.on("error", (error) => {
    console.error("Error:", error);
    browser.close();
  });

  // Set up an event listener for capturing media requests
  const videoUrlPromise = new Promise((resolve, reject) => {
    page.on("request", (request) => {
      if (request.resourceType() === "media") {
        console.log("Media request intercepted:", request.url());
        browser.close();
        resolve(request.url());
      } else {
        console.log("you are here page is reloading requesting");
        request.continue();
      }
    });
  });

  // Navigate to the URL
  try {
    await page.goto(instagramUrl, { waitUntil: "domcontentloaded" });
  } catch (error) {
    console.error("Navigation Error:", error);
    browser.close();
    throw error; // Throw the error to be caught by the caller
  }

  // Wait for the promise to resolve
  const videoUrl = await videoUrlPromise;

  return videoUrl;
};

const downloadVideo = async (req, res) => {
  try {
    const url = req.body.videoUrl;
    console.log("u r getting url from ejs page", url);

    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const filename = "insta.mp4";
    // console.log(`this item isin handlesubmit if block ext check ${urlstr}`);
    // console.log("======================================================");
    res
      .status(200)
      .set("Content-Type", "video/mp4")
      .set("Content-Disposition", "attachment; filename=" + filename);

    response.data.pipe(res);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).send(error);
  }
};

const twitterpost = async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "Please provide a valid URL!" });
  }

  try {
    const instagramUrl = url;
    const videoUrl = await getDirectVideoUrl(instagramUrl); // Await the function call
    console.log("just before if else condition", videoUrl);

    if (videoUrl) {
      // Download the video using Axios
      // const downloadedVideoPath = await downloadVideo(videoUrl);

      // Render the response to the client with the downloaded video path
      res.render("index", { downloadUrl: videoUrl });
    } else {
      res.status(404).json({ error: "Video URL not found." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = { showhomepage, twitterpost, downloadVideo };
