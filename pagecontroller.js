const axios = require("axios");

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
        await page.goto(tweetUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
        const videoElementHandle = await page.waitForSelector("video", { timeout: 60000 });
        if (!videoElementHandle) {
          throw new Error("Video element not found");
        }
        const videoUrl = await page.evaluate((videoElement) => {
          return videoElement.src;
        }, videoElementHandle);
    
        return videoUrl;
    
 
      } catch (error) {
        console.error("Error:", error);
      } finally {
        await browser.close();
      }
    };

    const videoUrl = await getVideoUrl(url);

    if (videoUrl) {
      // Instead of saving the file, send the video URL to the client
      console.log("Outside fn",videoUrl);
      res.render("index", { downloadUrl: videoUrl });
  } else {
      res.status(404).json({ error: "Video URL not found." });
  }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

module.exports = { showhomepage, twitterpost };
