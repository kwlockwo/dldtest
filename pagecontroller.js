// const axios = require("axios");

// const puppeteer = require("puppeteer");

// const showhomepage = async (req, res) => {
//   res.render("index", {
//     downloadUrl: "",
//   });
// };

// const twitterpost = async (req, res) => {
//   const url = req.body.url;

//   if (!url) {
//     return res.status(400).json({ error: "Please provide a valid URL!" });
//   }

//   try {
//     const getVideoUrl = async (tweetUrl) => {
//       const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//           "--disable-setuid-sandbox",
//           "--no-sandbox",
//           "--single-process",
//           "--no-zygote",
//         ],
//         executablePath:
//           process.env.NODE_ENV === "production"
//             ? process.env.PUPPETEER_EXECUTABLE_PATH
//             : puppeteer.executablePath(),
//       });

//       const page = await browser.newPage();

//       try {

//         ///one way

//         // await page.goto(tweetUrl, { timeout: 90000*2 });
//         // await page.waitForSelector("video", { timeout: 90000*2 });
//         // const tweetData = await page.evaluate(() => {
//         //   const videoElement = document.querySelector("video");
//         //   console.log("Inside fn",videoElement);
//         //   return {
//         //     videoUrl: videoElement.src,
//         //   };
//         // });
//         // return tweetData.videoUrl;

//         // second way

//         await page.goto(tweetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
//         const videoElementHandle = await page.waitForSelector("video", { timeout: 10000 });
//         if (!videoElementHandle) {
//           throw new Error("Video element not found");
//         }
//         const videoUrl = await page.evaluate((videoElement) => {
//           return videoElement.src;
//         }, videoElementHandle);

//         return videoUrl;

//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         await browser.close();
//       }
//     };

//     const videoUrl = await getVideoUrl(url);

//     if (videoUrl) {
//       // Instead of saving the file, send the video URL to the client
//       console.log("Outside fn",videoUrl);
//       res.render("index", { downloadUrl: videoUrl });
//   } else {
//       res.status(404).json({ error: "Video URL not found." });
//   }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// };

// module.exports = { showhomepage, twitterpost };

/////////////////////////////////////////////

const axios = require("axios");
const puppeteer = require("puppeteer");

const showhomepage = async (req, res) => {
  res.render("index", {
    downloadUrl: "",
  });
};
const getDirectVideoUrl = async (instagramUrl) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Create a promise that resolves when the video URL is found
  const videoUrlPromise = new Promise((resolve, reject) => {
    page.on("request", (request) => {
      if (request.resourceType() === "media") {
        console.log("Media request intercepted:", request.url());
        browser.close();
        resolve(request.url());
      } else {
        request.continue();
      }
    });

    page.on("error", (error) => {
      console.error("Error:", error);
      browser.close();
      reject(error);
    });

    // Navigate to the URL
    page.goto(instagramUrl, { waitUntil: "domcontentloaded" })
      .catch((error) => {
        reject(error);
      });
  });

  // Wait for the promise to resolve
  const videoUrl = await videoUrlPromise;

  return videoUrl;
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
      // Render the response to the client
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
