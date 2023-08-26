const axios = require("axios");
const path = require("path"); // Add this line to import the path module
const fs = require("fs");
const puppeteer = require("puppeteer");

const showhomepage = async (req, res) => {
  res.render("index", {
    downloadUrl: "",
  });
};

const twitterpost = async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "Please provide a valid URL!" });
  }

  try {
    const getVideoUrl = async (tweetUrl) => {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });

      const page = await browser.newPage();

      try {
        await page.goto(tweetUrl, { timeout: 90000 });
        await page.waitForSelector("video", { timeout: 90000 });

        const tweetData = await page.evaluate(() => {
          const videoElement = document.querySelector("video");
          return {
            videoUrl: videoElement.src,
          };
        });
        console.log("==================================")
        console.log("tweetdata url",tweetData.videoUrl)
        return tweetData.videoUrl;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        await browser.close();
      }
    };

    const videoUrl = await getVideoUrl(url);
    const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
    console.log(response.data);
    if (videoUrl) {
      // Instead of saving the file, send the video URL to the client
      res.render("index", { downloadUrl: videoUrl });
  } else {
      res.status(404).json({ error: "Video URL not found." });
  }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred." });
  }
};

module.exports = { showhomepage, twitterpost };
