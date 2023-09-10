// const axios = require("axios");

// const puppeteer = require("puppeteer");


// const showhomepage = async (req, res) => {
//   res.render("index", {
//     downloadUrl: "",
//   });
// };

// const downloadVideo = async (req, res) => {
//   try {
//     const url = req.body.videoUrl;
//     console.log("Getting URL from EJS page:", url);

//     const response = await axios({
//       method: "GET",
//       url: url,
//       responseType: "stream",
//     });

//     const filename = "video.mp4";

//     res
//       .status(200)
//       .set("Content-Type", "video/mp4")
//       .set("Content-Disposition", "attachment; filename=" + filename);

//     response.data.pipe(res);
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     res.status(500).send(error);
//   }
// };

// const twitterpost = async (req, res) => {
//   const tweetUrl = req.body.url;

//   if (!tweetUrl) {
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
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36');

//       try {
//         ///one way

//         await page.goto(tweetUrl, { waitUntil: "domcontentloaded" });
//         console.log("Navigation done. Page loaded");
//         await page.waitForSelector("video", { timeout: 90000 * 2 });
//         console.log("Video tag found");
//         const tweetData = await page.evaluate(() => {
//           const videoElement = document.querySelector("video");
//           return {
//             videoUrl: videoElement.src,
//           };
//         });
//         console.log("tweetData.videoUrl", tweetData.videoUrl);
//         return tweetData.videoUrl;

//         // // second way

//         // await page.goto(tweetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
//         // const videoElementHandle = await page.waitForSelector("video", { timeout: 10000 });
//         // if (!videoElementHandle) {
//         //   throw new Error("Video element not found");
//         // }
//         // const videoUrl = await page.evaluate((videoElement) => {
//         //   return videoElement.src;
//         // }, videoElementHandle);

//         // return videoUrl;
//         // // // //  // // //
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         await browser.close();
//       }
//     };

//     const videoUrl = await getVideoUrl(tweetUrl );

//     if (videoUrl) {
//       // Instead of saving the file, send the video URL to the client
//       console.log("Outside fn", videoUrl);
//       res.render("index", { downloadUrl: videoUrl });
//     } else {
//       res.status(404).json({ error: "Video URL not found." });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// };

// module.exports = { showhomepage, twitterpost, downloadVideo };



/////////////////////////other deployed at createway




// const axios = require("axios");

// const puppeteer = require("puppeteer");


// const showhomepage = async (req, res) => {
//   res.render("index", {
//     downloadUrl: "",
//   });
// };

// const downloadVideo = async (req, res) => {
//   try {
//     const url = req.body.videoUrl;
//     console.log("Getting URL from EJS page:", url);

//     const response = await axios({
//       method: "GET",
//       url: url,
//       responseType: "stream",
//     });

//     const filename = "video.mp4";

//     res
//       .status(200)
//       .set("Content-Type", "video/mp4")
//       .set("Content-Disposition", "attachment; filename=" + filename);

//     response.data.pipe(res);
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     res.status(500).send(error);
//   }
// };

// const twitterpost = async (req, res) => {
//   const tweetUrl = req.body.url;

//   if (!tweetUrl) {
//     return res.status(400).json({ error: "Please provide a valid URL!" });
//   }

//   try {
//         const getVideoUrl = async (tweetUrl) => {
//       // const browser = await puppeteer.launch();
//       const browser = await puppeteer.launch({
//         headless: "new",
//         args: [
//           // "--proxy-server='direct://'", 
//           // '--proxy-bypass-list=*',
//           "--disable-setuid-sandbox",
//           "--no-sandbox",
//           "--single-process",
//           "--no-zygote"
        
//         ],
//         executablePath:
//           process.env.NODE_ENV === "production"
//             ? process.env.PUPPETEER_EXECUTABLE_PATH
//             : puppeteer.executablePath(),
//       });


      
//       const page = await browser.newPage();
//       // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
//       try {
//         // await page.goto(tweetUrl);
//         await page.goto(tweetUrl, { timeout: 90000 }); // Timeout set to 10 seconds (10,000 milliseconds)
//         console.log("Page navigated to provided url");
//         // await page.waitForSelector("video");
        
//         await page.waitForSelector("video", { timeout: 90000 }); // Timeout set to 5 seconds (5,000 milliseconds)
        
//         // // // retry mechanishm
//         // const maxRetries = 5;
//         // let retryCount = 0;
        
//         // while (retryCount < maxRetries) {
//         //   try {
//         //     await page.waitForSelector("video", { timeout: 30000 }); // Shorter initial timeout
//         //     console.log(retryCount+1,"st Retry done");            
//         //     break; // Exit the loop if the selector is found
//         //   } catch (error) {
//         //     // Handle the timeout error or log it
//         //     console.error("Timeout error:", error);
//         //     retryCount++;
//         //   }
//         // }





//         // // // // //
//         console.log("Video tag found");
//         const tweetData = await page.evaluate(
//           () => {
//             const videoElement = document.querySelector("video");
//             return {
//               videoUrl: videoElement.src,
//             };
//           },
//           // { timeout: 90000 } // Timeout set to 90 seconds (90,000 milliseconds)
//         );

//         return tweetData.videoUrl;
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//           // Close the page and browser when done
//         // await page.close();
//         await browser.close();
//       }
//     };

//     const videoUrl = await getVideoUrl(tweetUrl);   

//     if (videoUrl) {
//       // Instead of saving the file, send the video URL to the client
//       console.log("Outside fn", videoUrl);
//       res.render("index", { downloadUrl: videoUrl });
//     } else {
//       res.status(404).json({ error: "Video URL not found." });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// };

// module.exports = { showhomepage, twitterpost, downloadVideo };



// // // with promise way

/// This approach of getting getDirecturl not working at production but working in local



const axios = require("axios");
const puppeteer = require("puppeteer");
const path = require("path"); // Make sure you have path module imported
const fs = require("fs");

const showhomepage = async (req, res) => {
  res.render("index", {
    downloadUrl: "",
  });
};


// const getDirectVideoUrl = async (instagramUrl) => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   // Enable request interception
//   await page.setRequestInterception(true);

//   // Set up an event listener for handling errors
//   page.on("error", (error) => {
//     console.error("Error:", error);
//     browser.close();
//   });

//   // Set up an event listener for capturing media requests
//   const videoUrlPromise = new Promise((resolve, reject) => {
//     page.on("request", (request) => {
//       if (request.resourceType() === "media") {
//         console.log("Media request intercepted:", request.url());
//         browser.close();
//         resolve(request.url());
//       } else {
//         request.continue();
//       }
//     });
//   });

//   // Navigate to the URL
//   try {
//     await page.goto(instagramUrl, { waitUntil: "domcontentloaded" });
//   } catch (error) {
//     console.error("Navigation Error:", error);
//     browser.close();
//     throw error; // Throw the error to be caught by the caller
//   }

//   // Wait for the promise to resolve
//   const videoUrl = await videoUrlPromise;

//   return videoUrl;
// };

//// This approach is working at local checking for production for insta////

const getDirectVideoUrl = async (instagramUrl) => {
  const browser = await puppeteer.launch({ headless:"new" });
  const browserVersion = await browser.version();
  console.log('Chromium Version:', browserVersion);
  const page = await browser.newPage();

  // Enable request interception

  await page.setRequestInterception(true);
  console.log("1 setRequestInterception(true) this done");

  // Navigate to the URL
  console.log("5 just start of navigation");
  page.goto(instagramUrl, { waitUntil: "domcontentloaded" }).catch((error) => {
    reject(error);
  });
  console.log("6 page navigated");

  // Create a promise that resolves when the video URL is found
  const videoUrlPromise = new Promise((resolve, reject) => {
    console.log("2 just enter inside new promise");
    page.on("request", (request) => {
      console.log("3. request event listned triggered");
      if (request.resourceType() === "media") {
        console.log("Media request intercepted:", request.url());
        browser.close();
        resolve(request.url());
      } else {
        console.log("4. request continuingggggg",request.url());
        console.log("Resource Type:", request.resourceType()); 
        request.continue();
      }
    });

    page.on("error", (error) => {
      console.error("Error:", error);
      browser.close();
      reject(error);
    });
  });

  // Wait for the promise to resolve
  const videoUrl = await videoUrlPromise;

  return videoUrl;
};

/////////////////////////////////////////////////////////

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
