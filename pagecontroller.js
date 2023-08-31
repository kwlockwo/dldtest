const axios = require("axios");

const puppeteer = require("puppeteer");


const showhomepage = async (req, res) => {
  res.render("index", {
    downloadUrl: "",
  });
};

const downloadVideo = async (req, res) => {
  try {
    const url = req.body.videoUrl;
    console.log("Getting URL from EJS page:", url);

    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const filename = "video.mp4";

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
  const tweetUrl = req.body.url;

  if (!tweetUrl) {
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
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36');

      try {
        ///one way

        await page.goto(tweetUrl, { waitUntil: "domcontentloaded" });
        console.log("Navigation done. Page loaded");
        await page.waitForSelector("video", { timeout: 90000 * 2 });
        console.log("Video tag found");
        const tweetData = await page.evaluate(() => {
          const videoElement = document.querySelector("video");
          return {
            videoUrl: videoElement.src,
          };
        });
        console.log("tweetData.videoUrl", tweetData.videoUrl);
        return tweetData.videoUrl;

        // // second way

        // await page.goto(tweetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
        // const videoElementHandle = await page.waitForSelector("video", { timeout: 10000 });
        // if (!videoElementHandle) {
        //   throw new Error("Video element not found");
        // }
        // const videoUrl = await page.evaluate((videoElement) => {
        //   return videoElement.src;
        // }, videoElementHandle);

        // return videoUrl;
        // // // //  // // //
      } catch (error) {
        console.error("Error:", error);
      } finally {
        await browser.close();
      }
    };

    const videoUrl = await getVideoUrl(tweetUrl );

    if (videoUrl) {
      // Instead of saving the file, send the video URL to the client
      console.log("Outside fn", videoUrl);
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
